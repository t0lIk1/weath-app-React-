

import { useEffect, useState } from 'react';
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

    // useEffect(() => {
    //     if (!apiKey) {
    //         setShowEntWindow(true);
    //     } else {
    //         getPosition().then(() => {
    //             updateWeather();
    //         }).catch(() => {
    //             if (!weatherData) {
    //                 getWeather();
    //             }

    //         });
    //     }
    // }, [apiKey, getPosition]);

    useEffect(() => {
        updateWeather();
    }, [])

    const updateWeather = async () => {
        const data = await getWeather();
        onLoading(data);
    };


    function handleApiKeyChange(newApiKey) {
        localStorage.setItem('apikey', newApiKey);
        setShowEntWindow(false);
        setApiKey(newApiKey);
    }

    const onLoading = (data) => {
        console.log("load..")
        setWeatherData(data);
    };
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
                        <HorlyInfo weather={weatherData}
                            isLoading={isLoading}
                            hasError={hasError} />

                        <CurrentInfo weatherData={weatherData} />
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
