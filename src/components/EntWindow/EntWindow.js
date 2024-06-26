// EntWindow.js

import React, { useState } from 'react';
import './EntWindow.scss';
import useWeatherService from '../../services/WeatherService';
import { useNavigate } from 'react-router-dom';

const EntWindow = () => {
  const [name, setName] = useState('');
  const [meaning, setMeaning] = useState('');

  const { getWeather } = useWeatherService();
  const navigate = useNavigate();

  function onApiKeyChange(newApiKey) {
    localStorage.setItem('apikey', newApiKey);
  }

  const onCorrect = (data, apiKey) => {
    setName('correct');
    setTimeout(() => {
      onApiKeyChange(apiKey);
      console.log("redirect...")
      navigate("/");
    }, 1000);
  };

  const onError = () => {
    setName('incorrect');
    setTimeout(() => {
      setName('');
    }, 3000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (meaning.trim() !== '') {
        getWeather(meaning, 33.44, -94.04)
          .then((data) => onCorrect(data, meaning))
          .catch(onError);
      }
    }
  };

  return (
    <div className={`enter ${name}`}>
      <h2 className="enter__title">Enter API Key</h2>
      <span className="enter__text">
        The key can be obtained from {' '}
        <a className="text__link" href="https://openweathermap.org/">
          openweathermap
        </a>
      </span>
      <input
        type="text"
        placeholder="API Key"
        value={meaning}
        className={`enter__input ${name}`}
        onChange={(e) => setMeaning(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default EntWindow;