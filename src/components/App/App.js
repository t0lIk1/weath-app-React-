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
            weatherData: null,
            isLoading: true,
            hasError: false,
            showEntWindow: !localStorage.getItem("apikey"),
            apiKey: localStorage.getItem("apikey"),
        };
        this.handleWeatherDataReady = this.handleWeatherDataReady.bind(this);
    }

    handleWeatherDataReady(weatherData) {
        this.setState({
            weatherData,
            isLoading: false,
            hasError: false
        });
    }

    componentDidMount() {
        if (!this.state.showEntWindow) {
            this.updateWeather();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.apiKey !== this.state.apiKey) {
            this.updateWeather();
        }
    }

    updateWeather = () => {
        if (!this.weatherService) {
            this.weatherService = new WeatherService();
            // Pass the callback function to WeatherService
            this.weatherService.onWeatherDataReady = this.handleWeatherDataReady;
        }
        this.weatherService.getPosition()

    }

    handleApiKeyChange = (newApiKey) => {
        localStorage.setItem('apikey', newApiKey);
        this.setState({
            showEntWindow: false,
            apiKey: newApiKey
        });
    };

    handleWeatherData = (data) => {
        console.log(data);
        this.setState({ weatherData: data, isLoading: false, hasError: false });
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
                        <WeatherService onWeatherDataReady={this.handleWeatherDataReady} />
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
