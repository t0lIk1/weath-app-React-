import { useState, useEffect } from 'react';
import { getImg } from '../components/Data/getImg';
import { useHtpp } from '../components/hooks/htpp.hooks';

const useWeatherService = () => {
    const { request, isLoading, hasError } = useHtpp();
    const [lat, setLat] = useState('39.099724')
    const [lon, setLon] = useState('-94.578331')
    const [apiKey, setApiKey] = useState(localStorage.getItem('apikey'));
    const [units, setUnits] = useState('metric');
    const [limit, setLimit] = useState(5);

    const getPosition = async () => {
        if (!navigator.geolocation) {
            console.log('Ваш браузер не дружит с геолокацией...');
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    };

    const success = (position) => {
        const { longitude, latitude } = position.coords;
        setLat(latitude);
        setLon(longitude);
    };

    const error = () => {
        console.log('Не получается определить вашу геолокацию :(');
    };

    async function getCoord(town) {
        const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${town}&limit=${limit}&appid=${apiKey}`;
        const res = await request(apiUrl);
        return res.map(_townList);
    }

    const getWeather = async (apikey = apiKey) => {
        console.log(apiKey)
        const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${apikey}`;
        console.log(apiUrl);
        const res = await request(apiUrl);
        const current = _currentTransform(res.current);
        const hourly = res.hourly.map(_hourlyTransform);
        const daily = res.daily.map(_dailyTransform);
        const data = { current: current, hourly: hourly, daily: daily };
        console.log(data)
        return data;
    };

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
        return direction[significance];
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

    const _currentTransform = (weather) => {
        return {
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
            img: getImg(weather.weather[0].main),
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
            name: data.local_names.en
        };
    };
    return {getCoord, getWeather, getPosition, isLoading, hasError}
}

export default useWeatherService;
