import React, { Component, Fragment } from 'react';
import BasicInfo from "../BasicInfo/BasicInfo";
import EntWindow from "../EntWindow/EntWindow";
import HorlyInfo from "../HorlyInfo/HorlyInfo";
import CurrentInfo from "../CurrentInfo/CurrentInfo";
import WeatherService from "../../services/WeatherService";


class App extends Component {
    weatherService = new WeatherService();
    constructor(props) {
        super(props);
        this.state = {
            weatherData: null,
            isLoading: true,
            hasError: false,
            showEntWindow: !localStorage.getItem("apikey"),
        };
    }

    onLoad = (weatherData) => {
        this.setState({
            weatherData,
            isLoading: false,
        });
    }

    updateWeather = () => {
        this.weatherService.getPosition()
            .finally(this.onLoad)
            .catch(() => this.onError());
    }

    onError = () => {
        this.setState({
            hasError: true,
            isLoading: false,
        });
    }

    componentDidMount() {
        this.updateWeather();
    }

    handleApiKeyChange = (newApiKey) => {
        localStorage.setItem('apikey', newApiKey);
        this.setState({
            showEntWindow: false,
        });
    };

    handleWeatherData = (data) => {
        console.log(data);
        this.setState({ weatherData: data });
    };

    render() {
        const { weatherData, isLoading, hasError, showEntWindow } = this.state;
        return (
            <div className="container">
                {showEntWindow ? (
                    <EntWindow
                        onApiKeyChange={this.handleApiKeyChange}
                        onWeatherData={this.handleWeatherData}
                    />
                ) : (
                    <>
                        <BasicInfo
                            weatherData={weatherData}
                            isLoading={isLoading}
                            hasError={hasError}
                        />
                        <div className="right">
                            <HorlyInfo weatherData={weatherData} />
                            <CurrentInfo weatherData={weatherData} />
                        </div>
                    </>
                )}
            </div>
        );
    }
}

export default App;