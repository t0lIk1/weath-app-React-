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

  const updateWeather = async () => {
    const data = await getWeather();
    onLoading(data);
  };

  const onLoading = (data) => {
    setWeatherData(data);
  };

  // Используйте navigate для перенаправления
  const content = !userAccept ? <BasicInput /> : <View weatherData={weatherData} hasError={hasError} isLoading={isLoading} />;

  return (
    <>
      {content}
    </>
  );
}

const View = ({ weatherData, hasError, isLoading }) => {
  return (
    <div className="container">
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
    </div>
  );
}

export default MainPage;