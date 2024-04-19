import React, { Component } from 'react';
import geo from '../../resources/img/svg/icons8-маркер-50 2.svg';
import magi from '../../resources/img/svg/icons8-лупа-64 3.svg';
import WeatherService from '../../services/WeatherService';
import Spinner from '../Spiner/Spiner';
import ErrorMassege from '../ErrorMassage/ErrorMassage';


import './BasicInfo.scss';


class BasicInfo extends Component {
  weatherService = new WeatherService();

  state = {
    weather: {},
    error: false,
    loading: true,
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false
    });
  }

  onLoading = () => {
    this.setState({
      loading: true,
    })
  }

  onLoad = (weather) => {
    this.setState({
      weather,
      loading: false
    });
    console.log(this.state.weather);
  }

  updateWeather = () => {
    this.onLoading();
    this.weatherService.getWeather()
      .then(this.onLoad)
      .catch(this.onError);
  }

  componentDidMount() {
    this.updateWeather();
  }

  render() {
    const { weather, loading, error } = this.state;
    const errorMassage = error ? <ErrorMassege /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View weather={weather} /> : null;

    return (
      <div className="info__block">
        {errorMassage}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({ weather }) => {
  return (
    <>
      <form action="" className="search-form">
        <img src={magi} alt="magi" className="search-form__img" />
        <input type="text" className="search-form__input" placeholder="Search for place" />
        <img src={geo} alt="geo" className="search-form__img-mark" />
      </form>

      <div className="basic">
        <img src={(weather.current.img)} alt="weather" className="basic__img" />
        <div className="basic-info">
          <h1 className="basic-info__town">Los Angeles</h1>
          <span className="basic-info__date">{weather.current.dt}</span>
          <h2 className="basic-info__weather">{weather.current.main}</h2>
          <h2 className="basic-info__temp">{weather.current.temp}°C</h2>
          <h2 className="basic-info__feelslike">Feels like: {weather.current.feelsLike}°C</h2>
        </div>
      </div>

      <div className="line"></div>



      <div className="days-forecast">
        <div className="days-forecast__list">

          {/* Add top navigation buttons */}
          <div className="swiper-button-prev top" style={{ transform: 'rotate(90deg)', color: '#fff' }}></div>
          <div className="swiper-button-next top" style={{ transform: 'rotate(90deg)', color: '#fff' }}></div>

          {weather.daily.map((day, index) => (
            <div className="days-forecast__item" key={index}>
              <img src={day.img} alt="weather" className="days-forecast__img" />
              <span className="days-forecast__temp text"> {day.temp}°C</span>
              <span className="days-forecast__date text">{day.dt}</span>
            </div>
          ))}

        </div>
      </div>
    </>
  )
}

export default BasicInfo;
