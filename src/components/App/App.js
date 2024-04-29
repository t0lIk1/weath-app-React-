import { useEffect, useState } from 'react';
import BasicInfo from "../BasicInfo/BasicInfo";
import EntWindow from "../EntWindow/EntWindow";
import HorlyInfo from "../HorlyInfo/HorlyInfo";
// import CurrentInfo from "../CurrentInfo/CurrentInfo";
import useWeatherService from '../../services/WeatherService';

const App = () => {

    const { isLoading, hasError, getWeather, getPosition } = useWeatherService();
    const [showEntWindow, setShowEntWindow] = useState(!localStorage.getItem("apikey"));
    const [weatherData, setWeatherData] = useState(null);
    const [apiKey, setApiKey] = useState(localStorage.getItem("apikey"));

    // const handleWeatherDataReady = (weatherData) => {
    //     setWeatherData(weatherData);
    //     setIsLoading(false);
    //     setHasError(false);
    // }

    useEffect(() => {
        console.log('effect');
        if (!weatherData) {

            updateWeather()
        }
    }, [])


    const updateWeather = async () => {
            const data = await getWeather();
            onLoading(data);
    };

    const handleApiKeyChange = (newApiKey) => {
        localStorage.setItem('apikey', newApiKey);
        setShowEntWindow(false);
        setApiKey(newApiKey);
    };

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
                        <HorlyInfo weatherData={weatherData} />
                        {/* <CurrentInfo weatherData={weatherData} /> */}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
