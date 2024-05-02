// App.js

import React, { useState, useEffect, useCallback } from 'react';
import BasicInfo from "../BasicInfo/BasicInfo";
import EntWindow from "../EntWindow/EntWindow";
import HorlyInfo from "../HorlyInfo/HorlyInfo";
import CurrentInfo from "../CurrentInfo/CurrentInfo";
import useWeatherService from '../../services/WeatherService';

const App = () => {
    const { isLoading, hasError, getWeather, getPosition } = useWeatherService();
    const [showEntWindow, setShowEntWindow] = useState(!localStorage.getItem("apikey"));
    const [weatherData, setWeatherData] = useState(null);
    const [apiKey, setApiKey] = useState(localStorage.getItem("apikey"));

    useEffect(() => {
        if (!apiKey) {
            setShowEntWindow(true);
        } else {
            getPosition().then(() => {
                updateWeather();
            }).catch(() => {
                if (!weatherData) {
                    getWeather(apiKey).then((data) => onLoading(data));
                }
            });
        }
    }, [apiKey, getPosition]);
    

    const updateWeather = async () => {
        const data = await getWeather(apiKey);
        onLoading(data);
    };

    function handleApiKeyChange(newApiKey) {
        localStorage.setItem('apikey', newApiKey);
        setShowEntWindow(false);
        setApiKey(newApiKey);
    }

    const onLoading = (data) => {
        setWeatherData(data);
    };

    const content = showEntWindow ? <EntWindow onApiKeyChange={handleApiKeyChange} /> : <Content weatherData={weatherData} hasError={hasError} isLoading={isLoading} />;
    return (
        <div className="container">
            {content}
        </div>
    );
}

const Content = ({ weatherData, hasError, isLoading }) => {
    return (
        <>
            <BasicInfo
                weather={weatherData}
                isLoading={isLoading}
                hasError={hasError}
            />
            <div className="right">
                <HorlyInfo weather={weatherData}
                    isLoading={isLoading}
                    hasError={hasError} />
                <CurrentInfo weatherData={weatherData} />
            </div>
        </>
    );
}

export default App;
