// EntWindow.js

import React, { useState } from 'react';
import './EntWindow.scss';
import useWeatherService from '../../services/WeatherService';
import { redirect } from 'react-router-dom';
const EntWindow = () => {
  const [name, setName] = useState('');
  const [meaning, setMeaning] = useState('');

  const { getWeather } = useWeatherService();

  function onApiKeyChange(newApiKey) {
    localStorage.setItem('apikey', newApiKey);
  }

  const onCorrect = (data, apiKey) => {
    setName('correct');
    setTimeout(() => {
      onApiKeyChange(apiKey);
      console.log("redirect...")
    }, 1500);
    return redirect("/");
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
        console.log(getWeather(meaning))
        getWeather(meaning)
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
