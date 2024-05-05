import { useEffect, useState } from "react";
import useWeatherService from "../services/WeatherService";
import EntWindow from "../components/EntWindow/EntWindow";
import BasicInfo from "../components/BasicInfo/BasicInfo";
import HorlyInfo from "../components/HorlyInfo/HorlyInfo";
import CurrentInfo from "../components/CurrentInfo/CurrentInfo";

const MainPage = () => {
  const { isLoading, hasError, getWeather, getPosition, key, userAccept } = useWeatherService();
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    getPosition()
  }, []);
  useEffect(() => {
    if (userAccept) {
      updateWeather(); // Then call updateWeather
    }
  }, [userAccept]);

  const updateWeather = async () => {
    const data = await getWeather();
    onLoading(data);
  };

  function handleApiKeyChange(newApiKey) {
    localStorage.setItem('apikey', newApiKey);
  }

  const onLoading = (data) => {
    setWeatherData(data);
  };

  const content = !key ? <EntWindow onApiKeyChange={handleApiKeyChange} /> : <View weatherData={weatherData} hasError={hasError} isLoading={isLoading} getCoord={getPosition} />;

  return (
    <>
      <View weatherData={weatherData} hasError={hasError} isLoading={isLoading} getCoord={getPosition} />
    </>
  )
}


const View = ({ weatherData, hasError, isLoading, getCoord }) => {

  return (
    <div className="container">
      <BasicInfo
        getCoord={getCoord}
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
  )

}

export default MainPage;