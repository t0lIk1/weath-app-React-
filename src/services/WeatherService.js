import { useState, useCallback } from 'react';
import { getImg } from '../components/Data/getImg';
import { useHtpp } from '../components/hooks/htpp.hooks';
const useWeatherService = () => {

  const { request, isLoading, hasError } = useHtpp();
  const [userAccept, setUserAccept] = useState(false);
  const [userDecline, setUserDecline] = useState(false);
  const [userLocation, setUserLocation] = useState();
  const [key] = useState(localStorage.getItem('apikey'));
  const [units] = useState('metric');
  const [limit] = useState(5);

  const setUserDeclineState = (value) => {
    setUserDecline(value);
  };

  const getPosition = useCallback(async () => {
    console.log(userLocation)
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position)
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          console.log(userLocation)
          setUserAccept(true);
        }, (error) => {
          console.log('qq')
          setUserDecline(true);

        }
      )
    }
  }, [userLocation]);

  async function getCoord(town) {
    const sanitizedTown = town.replaceAll(' ', '');

    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${sanitizedTown}&limit=${limit}&appid=${key}`;
    console.log(apiUrl);
    const res = await request(apiUrl);
    return res.map(_townList);
  }

  const getTownName = async (latitude, longitude) => {
    const apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${key}`;
    const res = await request(apiUrl);
    return `${res[0].name}, ${res[0].country}`;
  }

  async function getWeather(apiKey = key, latitude = userLocation.latitude, longitude = userLocation.longitude) {
    ""
    console.log(latitude, longitude)
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
    console.log(apiUrl)
    const res = await request(apiUrl);
    if (!key) {
      return
    }
    const current = await _currentTransform(res.current, latitude, longitude);
    const hourly = res.hourly.map(_hourlyTransform);
    console.log(userLocation);
    const daily = res.daily.map(_dailyTransform);
    const data = { current: current, hourly: hourly, daily: daily };
    return data;
  }

  const translateTime = (time) => {
    const date = new Date(time * 1000);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const translateDeg = (deg) => {
    let direction = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    if (deg === 360) {
      return direction[0];
    }
    let significance = Math.round(deg / 45);
    return direction[significance - 1];
  };

  const translateDate = (utcDate) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const daysOfWeek = [
      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    ];

    const date = new Date(utcDate * 1000);
    const dayOfMonth = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const dayOfWeek = daysOfWeek[date.getUTCDay()];

    return `${dayOfWeek}, ${month} ${dayOfMonth} `;
  };

  const _currentTransform = async (weather, lat, lon) => {
    const cityName = await getTownName(lat, lon);
    return {
      name: cityName,
      sunrise: translateTime(weather.sunrise),
      sunset: translateTime(weather.sunset),
      dt: translateDate(weather.dt),
      temp: Math.round(weather.temp),
      feelsLike: Math.round(weather.feels_like),
      pressure: weather.pressure,
      humidity: weather.humidity,
      uvi: Math.round(weather.uvi),
      windSpeed: weather.wind_speed,
      windDeg: translateDeg(weather.wind_deg),
      main: weather.weather[0].main,
      img: getImg(weather.weather[0].main),
    };
  };

  const _hourlyTransform = (weather) => {
    return {
      temp: Math.round(weather.temp),
      dt: translateTime(weather.dt),
      windDeg: translateDeg(weather.wind_deg),
      main: weather.weather[0].main,
      img: getImg(weather.weather[0].main)
    };
  };

  const _dailyTransform = (weather) => {
    return {
      dt: translateDate(weather.dt),
      temp: Math.round(weather.temp.day),
      main: weather.weather[0].main,
      img: getImg(weather.weather[0].main),
    };
  }
  const _townList = (data) => {
    return {
      lat: data.lat,
      lon: data.lon,
      country: data.country,
      name: data.name
    };
  };
  return { getCoord, getWeather, getPosition, isLoading, hasError, key, userAccept, userLocation, userDecline, setUserDeclineState }
}

export default useWeatherService;



