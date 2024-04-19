import React, { Component } from 'react';
import './EntWindow.scss';
import WeatherService from '../../services/WeatherService'

class EntWindow extends Component {
    weatherService = new WeatherService();
    state = {
        className: '',
        displayStyle: 'flex',
        value: '',
    };

    onCorrect = () => {
        localStorage.setItem('apikey', this.state.value);
        this.setState({
            className: 'correct',
        })
        setTimeout(() => {
            this.setState({
                displayStyle: 'none',
            });
        }, 3000)

    };


    onError = () => {
        this.setState({ className: 'incorrect' });
        setTimeout(() => {
            this.setState({ className: '' });
        }, 3000);
    };

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    };

    handleKeyDown = (e) => {
        if (e.key === "Enter") {
            this.weatherService.getWeather(this.state.value)
                .then(this.onCorrect)
                .catch(this.onError)
        }
    };

    render() {
        const { className, displayStyle, value } = this.state;
        return (
            <div className={`enter ${className}`} style={{ display: displayStyle }}>
                <h2 className="enter__title">Enter Api key</h2>
                <span className="enter__text">The key can be obtained from <a className="text__link" href="https://openweathermap.org/">openweathermap</a></span>
                <input
                    type="text"
                    placeholder='Api key'
                    value={value}
                    className={`enter__input ${className}`}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
            </div>
        );
    }
};

export default EntWindow;