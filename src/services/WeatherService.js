import React, { Component } from 'react';
import { getImg } from '../components/Data/getImg';
const weatherDataReadyEvent = new Event('weatherDataReady');
class WeatherService extends Component {

    state = {
        apiKey: localStorage.getItem('apikey'),
        lat: '39.099724',
        lon: '-94.578331',
        limit: 5,
        units: 'metric',
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.weatherData !== prevState.weatherData) {
            this.refs.weatherService.dispatchEvent(weatherDataReadyEvent);
        }
    }

    componentDidMount() {
        this.getPosition();
    }

    getPosition = async () => {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve(position);
                },
                (error) => {
                    reject(error);
                }
            );
        });

        if (position.coords) {
            const { latitude, longitude } = position.coords;
            return { lat: latitude, lon: longitude };
        } else {
            console.log("Разрешение на геолокацию было отказано");
            return this.state.lat && this.state.lon ? { lat: this.state.lat, lon: this.state.lon } : null;
        }
    };



    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    getCoord = async (town) => {
        const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${town}&limit=${this.state.limit}&appid=${this.state.apiKey}`;
        const res = await this.getResource(apiUrl);
        return res.map(this._townList);
    };

    getWeather = async (apiKey = this.state.apiKey, lat = this.state.lat, lon = this.state.lon) => {
        console.log(apiKey)
        const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${this.state.units}&appid=${apiKey}`;
        console.log(apiUrl);
        const res = await this.getResource(apiUrl);
        const current = this._currentTransform(res.current);
        const hourly = res.hourly.map(this._hourlyTransform);
        const daily = res.daily.map(this._dailyTransform);
        const data = { current: current, hourly: hourly, daily: daily };
        console.log(data)
        return data;
    };

    translateTime = (time) => {
        const date = new Date(time * 1000);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    translateDeg = (deg) => {
        let direction = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        if (deg === 360) {
            return direction[0];
        }
        let significance = Math.round(deg / 45);
        return direction[significance];
    };

    translateDate = (utcDate) => {
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

    _currentTransform = (weather) => {
        return {
            sunrise: this.translateTime(weather.sunrise),
            sunset: this.translateTime(weather.sunset),
            dt: this.translateDate(weather.dt),
            temp: Math.round(weather.temp),
            feelsLike: Math.round(weather.feels_like),
            pressure: weather.pressure,
            humidity: weather.humidity,
            uvi: Math.round(weather.uvi),
            windSpeed: weather.wind_speed,
            windDeg: this.translateDeg(weather.wind_deg),
            main: weather.weather[0].main,
            img: getImg(weather.weather[0].main),
        };
    };

    _hourlyTransform = (weather) => {
        return {
            temp: Math.round(weather.temp),
            dt: this.translateTime(weather.dt),
            windDeg: this.translateDeg(weather.wind_deg),
            main: weather.weather[0].main,
            img: getImg(weather.weather[0].main),
        };
    };

    _dailyTransform = (weather) => {
        return {
            dt: this.translateDate(weather.dt),
            temp: Math.round(weather.temp.day),
            main: weather.weather[0].main,
            img: getImg(weather.weather[0].main),
        };
    }
    _townList = (data) => {
        return {
            lat: data.lat,
            lon: data.lon,
            country: data.country,
            name: data.local_names.en
        };
    };

    render() {
        return null;
    }
}

export default WeatherService;
