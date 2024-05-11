import { useEffect, useState } from "react";
import useWeatherService from "../services/WeatherService";
import BasicInfo from "../components/BasicInfo/BasicInfo";
import HorlyInfo from "../components/HorlyInfo/HorlyInfo";
import CurrentInfo from "../components/CurrentInfo/CurrentInfo";
import { useNavigate } from "react-router-dom";
import BasicInput from "../components/BasicInput/BasicInput";

const MainPage = () => {
  const { isLoading, hasError, getWeather, getPosition, key, userAccept, userLocation, getCoord } = useWeatherService();
  const [weatherData, setWeatherData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!key) {
      navigate('/Enter');
    }

    getPosition()
  }, [key, navigate]);
  useEffect(() => {
    if (userAccept) {
      updateWeather();
    }
  }, [userAccept, userLocation]);

  const updateWeather = async (apiKey = undefined, lat = undefined, lon = undefined) => {
    const data = await getWeather(apiKey, lat, lon);
    onLoading(data);
  };

  const onLoading = (data) => {
    setWeatherData(data);
  };

  const responsLat = (lat, lon) => {
    updateWeather(undefined, lat, lon)
  }

  // Используйте navigate для перенаправления
  const content = false ? <BasicInput /> : <View weatherData={weatherData} hasError={hasError} isLoading={isLoading} responsLat={responsLat} />;

  return (
    <>
      {content}
    </>
  );
}

const View = ({ weatherData, hasError, isLoading, responsLat }) => {
  return (
    <div className="container">
      <BasicInfo
        responsLat={responsLat}
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