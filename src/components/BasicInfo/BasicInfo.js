import React from 'react';
import WeatherService from '../../services/WeatherService';
import Spinner from '../Spiner/Spiner';
import ErrorMassege from '../ErrorMassage/ErrorMassage';
import BasicInput from '../BasicInput/BasicInput';

import './BasicInfo.scss';

const View = ({weather}) => {
  console.log(weather)
  return (
    <>
      <BasicInput />
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

      <div className="days-forecast" >
        <div className="days-forecast__list">
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

const BasicInfo = ({ weather, isLoading, hasError }, ) => {
  console.log(weather);
  // Check if weatherData.weather is defined before rendering the View component
  const content = !(isLoading || hasError) ? <View weather={weather} /> : null;
  const loading = isLoading ? <Spinner /> : null;
  const errorMessage = hasError ? <ErrorMassege /> : null;

  return (
    <div className='info__block'>
      {loading}
      {errorMessage}
      {content}
    </div>
  );
}


export default BasicInfo;