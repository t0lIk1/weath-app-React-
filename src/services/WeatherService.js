import { getImg } from '../components/Data/getImg'

class WeatherService {
    _apiKey = localStorage.getItem('apikey');  //9ee379df28e24468b01dce21275faecc
    _apiBase = 'https://api.openweathermap.org/data/3.0/onecall';
    _lat = '39.099724';
    _lon = '-94.578331';
    _limit = 5;
    _units = 'metric';


    getPosition = () => {
        const success = (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.getWeather(latitude, longitude)
        }

        const error = () => {
            console.log("Unable to retrieve your location");
            this.getWeather(this._lat, this._lon)
        }

        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by your browser");
        } else {
            console.log("Locating…");
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }




    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }
    getCoord = async (town) => {
        const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${town}&limit=${this._limit}&appid=9ee379df28e24468b01dce21275faecc`;
        const res = await this.getResource(apiUrl);
        return res.map(this._townList);
    }
    getWeather = async (lat, lon) => {
        const apiUrl = `${this._apiBase}?lat=${lat}&lon=${lon}&units=${this._units}&appid=${this._apiKey}`;
        console.log(apiUrl);
        const res = await this.getResource(apiUrl);
        const current = this._currentTransform(res.current);
        const hourly = res.hourly.map(this._hourlyTransform);
        const daily = res.daily.map(this._dailyTransform);
        const data = { current: current, hourly: hourly, daily: daily }
        return data;
    }

    translateTime = (time) => {
        const date = new Date(time * 1000);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    translateDeg = (deg) => {
        let direction = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        if (deg === 360) {
            return direction[0];
        }
        let significance = Math.round(deg / 45);
        return direction[significance];
    }

    translateDate(utcDate) {
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
    }

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
    }

    _hourlyTransform = (weather) => {
        return {
            temp: Math.round(weather.temp),
            dt: this.translateTime(weather.dt),
            windDeg: this.translateDeg(weather.wind_deg),
            main: weather.weather[0].main,
            img: getImg(weather.weather[0].main),
        };
    }

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
        }

    }
}

export default WeatherService;