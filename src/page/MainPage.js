// MainPage.js
import { useEffect, useState } from "react";
import useWeatherService from "../services/WeatherService";
import BasicInfo from "../components/BasicInfo/BasicInfo";
import HorlyInfo from "../components/HorlyInfo/HorlyInfo";
import CurrentInfo from "../components/CurrentInfo/CurrentInfo";
import { useNavigate } from "react-router-dom";
import BasicInput from "../components/BasicInput/BasicInput";

const MainPage = () => {
  const { isLoading, hasError, getWeather, getPosition, key, userAccept, userLocation, userDecline, setUserDeclineState } = useWeatherService();

  
  const [weatherData, setWeatherData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!key) {
      navigate('/Enter');
    } else {
      console.log('response....')
      getPosition();
    }
  }, [key, navigate]);

  useEffect(() => {
    if (userAccept) {
      updateWeather();
    }
  }, [userAccept, userLocation, userDecline]);

  

  const updateWeather = async (apiKey = undefined, lat = undefined, lon = undefined) => {
    const data = await getWeather(apiKey, lat, lon);
    if (!data) {
      return;
    }
    onLoading(data);
  };

  const onLoading = (data) => {
    setWeatherData(data);
  };

  const responsCoord = (lat, lon) => {
    if (userDecline) {
      setUserDeclineState(false)
    }
    updateWeather(undefined, lat, lon)
  };

  // Показывать BasicInput, если пользователь отказался от использования Geolocation API
  const content = !key ? null : userDecline ? <BasicInput responsCoord={responsCoord} /> : <View weatherData={weatherData} hasError={hasError} isLoading={isLoading} responsCoord={responsCoord} /> ;

  return (
    <>
      {content}
    </>
  );
}

const View = ({ weatherData, hasError, isLoading, responsCoord }) => {
  return (
    <div className="container">
      <BasicInfo
        responsCoord={responsCoord}
        weather={weatherData}
        isLoading={isLoading}
        hasError={hasError}
      />
      <div className="right">
        <HorlyInfo weather={weatherData}
          isLoading={isLoading}
          hasError={hasError} />
        <CurrentInfo weatherData={weatherData}
          isLoading={isLoading}
          hasError={hasError} />
      </div>
    </div>
  );
}

export default MainPage;