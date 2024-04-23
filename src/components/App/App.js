import React, { Component, Fragment } from 'react';
import BasicInfo from "../BasicInfo/BasicInfo";
import EntWindow from "../EntWindow/EntWindow";
import HorlyInfo from "../HorlyInfo/HorlyInfo";
// import CurrentInfo from "../CurrentInfo/CurrentInfo";
import WeatherService from "../../services/WeatherService";
import { Skeleton } from 'react-loading-skeleton';
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
        }
        this.setState({
            isLoading: true
        });
        try {
            this.weatherService.getPosition()
                .then(coords => this.weatherService.getWeather(undefined, coords.lat, coords.lon))
                .then(this.onLoading)
                .catch();
        } catch (error) {
            this.onError();
        }
    };

    handleApiKeyChange = (newApiKey) => {
        localStorage.setItem('apikey', newApiKey);
        this.setState({
            showEntWindow: false,
            apiKey: newApiKey
        });
    };

    onLoading = (data) => {
        console.log(data);
        this.setState({
            weatherData: data,
            isLoading: false,
            hasError: false
        });
    };
    onError = () => {
        this.setState({
            hasError: false,
            isLoading: false
        })
    }

    render() {
        const { weatherData, isLoading, hasError, showEntWindow } = this.state;
        return (
            <div className="container">
                {showEntWindow ? (
                    <EntWindow
                        onApiKeyChange={this.handleApiKeyChange}
                        onWeatherData={this.onLoading}
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
                            {/* <CurrentInfo weatherData={weatherData} /> */}
                        </div>
                    </>
                )}
            </div>
        );
    }
}

export default App;
