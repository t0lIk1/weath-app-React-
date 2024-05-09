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
    if (!key) {
      return
    }

    getPosition()
  }, [key]);
  useEffect(() => {
    if (userAccept) {
      updateWeather(); // Then call updateWeather
    }
  }, [userAccept]);

  const updateWeather = async () => {
    const data = await getWeather();
    onLoading(data);
  };



  const onLoading = (data) => {
    setWeatherData(data);
  };

  const content = !key ? <EntWindow /> : <View weatherData={weatherData} hasError={hasError} isLoading={isLoading} getCoord={getPosition} />;

  return (
    <>
      {content}
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