import geo from '../../resources/img/svg/icons8-маркер-50 2.svg';
import magi from '../../resources/img/svg/icons8-лупа-64 3.svg';
import './BasicInput.scss';
import WeatherService from '../../services/WeatherService';
import { Component } from 'react';

class BasicInput extends Component {

    weatherService = new WeatherService();
    render() {
        return (
            <form action="#" className="search-form">
                <img src={magi} alt="magi" className="search-form__img" />
                <input type="text" className="search-form__input" placeholder="Search for place" />
                <img src={geo} alt="geo" className="search-form__img-mark" onClick={this.weatherService.getPosition} />
            </form>
        )
    }
}



export default BasicInput;