import BasicInfo from "../BasicInfo/BasicInfo";
import EntWindow from "../EntWindow/EntWindow";
import HorlyInfo from "../HorlyInfo/HorlyInfo";
import CurrentInfo from "../CurrentInfo/CurrentInfo";
import WeatherService from "../../services/WeatherService";

const weatherService = new WeatherService();

const App = () => {
    if (localStorage.getItem("apikey")) {
        console.log(weatherService.getPosition());
        return (
            <div className="container">
                <BasicInfo />
                <div className="right">
                    <HorlyInfo />
                    <CurrentInfo />
                </div>
            </div>
        );
    } else {
        return <div className="container"> <EntWindow /> </div>;
    }
};

export default App;