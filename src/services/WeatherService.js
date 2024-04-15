import { getImg } from '../components/Data/getImg';

class WeatherService {
    _apiKey = '9ee379df28e24468b01dce21275faecc';
    _apiBase = 'https://api.openweathermap.org/data/3.0/onecall';
    _lat = '52.0944791';
    _lon = '23.759782';
    _limit = 5;
    _units = 'metric';


    getPosition = async () => {
        const success = (position) => {
            this._lat = position.coords.latitude;
            this._lon = position.coords.longitude;
            console.log(this._lat)
            this.getWeather();
        }

        const error = () => {
            console.log("Unable to retrieve your location");
            console.log(this._lat)
            this.getWeather();
        }

        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by your browser");
        } else {
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

    getWeather = async () => {
        const apiUrl = `${this._apiBase}?lat=${this._lat}&lon=${this._lon}&units=${this._units}&appid=${this._apiKey}`;
        console.log(apiUrl);
        const res = await this.getResource(apiUrl);
        const current = this._currentTransform(res.current);
        const hourly = res.hourly.map(this._hourlyTransform);
        const daily = res.daily.map(this._dailyTransform);
        const data = { current: current, hourly: hourly, daily: daily }
        console.log(data);
        return data;
    }



    _currentTransform = (weather) => {
        return {
            sunrise: weather.sunrise,
            sunset: weather.sunset,
            temp: weather.temp,
            pressure: weather.pressure,
            humidity: weather.humidity,
            uvi: weather.uvi,
            windSpeed: weather.wind_speed,
            windDeg: weather.wind_deg,
            weather: weather.weather[0].main,
            img: getImg(weather.weather[0].main)
        };
    }

    _hourlyTransform = (weather) => {
        return {
            temp: weather.temp,
            dt: weather.dt,
            windDeg: weather.wind_deg,
            weather: weather.weather[0].main,
            img: getImg(weather.weather[0].main)
        };
    }

    _dailyTransform = (weather) => {
        return {
            dt: weather.dt,
            temp: weather.temp,
            weather: weather.weather[0].main,
            img: getImg(weather.weather[0].main)
        };
    }
}

export default WeatherService;