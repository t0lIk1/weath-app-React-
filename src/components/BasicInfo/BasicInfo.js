// BasicInfo.js

import React, { Component } from 'react';
import './BasicInfo.scss';
import sunny from '../../resources/img/day_clear.png';
import geo from '../../resources/img/svg/icons8-маркер-50 2.svg';
import magi from '../../resources/img/svg/icons8-лупа-64 3.svg';

class BasicInfo extends Component {
  
  state = {
    weather: {},
    error: false,
    loading: true,
  }
  
  render() {
    return (
      <div className="info__block">
        <form action="" className="search-form">
          <img src={magi} alt="magi" className="search-form__img" />
          <input type="text" className="search-form__input" placeholder="Search for place" />
          <img src={geo} alt="geo" className="search-form__img-mark" />
        </form>

        <div className="basic">
          <img src={sunny} alt="weather" className="basic__img" />
          <div className="basic-info">
            <h1 className="basic-info__town">Los Angeles</h1>
            <span className="basic-info__date">Thursday, 31 Aug</span>
            <h2 className="basic-info__weather">Sunny</h2>
            <h2 className="basic-info__temp">24°C</h2>
            <h2 className="basic-info__feelslike">Feels like: 22°C</h2>
          </div>
        </div>

        <div className="line"></div>

        <div className="days-forecast">
          <ul className="days-forecast__list">
            {[...Array(5)].map((_, index) => (
              <li className="days-forecast__item" key={index}>
                <img src={sunny} alt="weat" className="days-forecast__img" />
                <span className="days-forecast__temp text">20°C</span>
                <span className="days-forecast__date text">Friday, 1 Sep</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default BasicInfo;