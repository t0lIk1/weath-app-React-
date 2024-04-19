import BasicInfo from "../BasicInfo/BasicInfo";
import EntWindow from "../EntWindow/EntWindow";
import HorlyInfo from "../HorlyInfo/HorlyInfo";
import CurrentInfo from "../CurrentInfo/CurrentInfo";
import WeatherService from "../../services/WeatherService";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const App = () => {
    if (localStorage.getItem("apikey")) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={
                        <div className="container">
                            <BasicInfo />
                            <div className="right">
                                <HorlyInfo />
                                <CurrentInfo />
                            </div>
                        </div>
                    } />
                </Routes>
            </BrowserRouter>
        );
    } else {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="Enter" element={<div className="container"> <EntWindow /> </div>} />
                </Routes>
            </BrowserRouter>
        );
    }
};

export default App;