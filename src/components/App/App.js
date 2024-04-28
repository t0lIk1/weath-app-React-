import React, { useEffect, useState } from 'react';
import BasicInfo from "../BasicInfo/BasicInfo";
import EntWindow from "../EntWindow/EntWindow";
import HorlyInfo from "../HorlyInfo/HorlyInfo";
// import CurrentInfo from "../CurrentInfo/CurrentInfo";
import WeatherService from "../../services/WeatherService";

const App = () => {

    const weatherService = new WeatherService();
    const [weatherData, setWeatherData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [showEntWindow, setShowEntWindow] = useState(!localStorage.getItem("apikey"));

    const [apiKey, setApiKey] = useState(localStorage.getItem("apikey"));

    // const handleWeatherDataReady = (weatherData) => {
    //     setWeatherData(weatherData);
    //     setIsLoading(false);
    //     setHasError(false);
    // }


    useEffect(() => {
        console.log('effect');
        updateWeather()
        console.log(weatherData)
    }, [])

    const updateWeather = () => {
        setIsLoading(true);
        weatherService.getWeather()
            .then((onLoading))
    };

    const handleApiKeyChange = (newApiKey) => {
        localStorage.setItem('apikey', newApiKey);
        setShowEntWindow(false);
        setApiKey(newApiKey);
    };

    const onLoading = (data) => {
        setWeatherData(data);
        console.log(data);
        setIsLoading(false);
        setHasError(false);
    };

    const onError = () => {
        setHasError(true);
        setIsLoading(false);
    }

    return (
        <div className="container">
            {showEntWindow ? (
                <EntWindow
                    onApiKeyChange={handleApiKeyChange}
                    onWeatherData={onLoading}
                />
            ) : (
                <>
                    <BasicInfo
                        weather={weatherData}
                        isLoading={isLoading}
                        hasError={hasError}
                    />
                    <div className="right">
                        <HorlyInfo weatherData={weatherData} />
                        {/* <CurrentInfo weatherData={weatherData} /> */}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
