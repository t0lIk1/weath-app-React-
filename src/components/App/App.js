import React, { Component, Fragment } from 'react';
import BasicInfo from "../BasicInfo/BasicInfo";
import EntWindow from "../EntWindow/EntWindow";
import HorlyInfo from "../HorlyInfo/HorlyInfo";
import CurrentInfo from "../CurrentInfo/CurrentInfo";
import WeatherService from "../../services/WeatherService";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: localStorage.getItem("apikey"),
            weatherData: null,
            showEntWindow: !localStorage.getItem("apikey"), // Проверяем, есть ли сохраненный ключ
        };
    }

    handleApiKeyChange = (newApiKey) => {
        localStorage.setItem('apikey', newApiKey);
        this.setState({
            apiKey: newApiKey,
            showEntWindow: false, // После ввода ключа скрываем окно ввода
        });
    };

    handleWeatherData = (data) => {
        console.log(data);
        this.setState({ weatherData: data });
    };

    render() {
        const { weatherData, apiKey, showEntWindow } = this.state;
        return (
            <div className="container">
                {showEntWindow ? (
                    <EntWindow
                        onApiKeyChange={this.handleApiKeyChange}
                        onWeatherData={this.handleWeatherData}
                    />
                ) : (
                    <Fragment>
                        <BasicInfo />
                        <div className="right">
                            <HorlyInfo weatherData={weatherData} />
                            <CurrentInfo weatherData={weatherData} />
                        </div>
                    </Fragment>
                )}
            </div>
        );
    }
}

export default App;
