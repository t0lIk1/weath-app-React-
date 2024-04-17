import cloudyImg from '../../resources/img/cloudy.png';
import overcastImg from '../../resources/img/overcast.png';
import rainImg from '../../resources/img/rain.png';
import snowImg from '../../resources/img/snow.png';
import thunderImg from '../../resources/img/thunder.png';
import rainThunderImg from '../../resources/img/rain_thunder.png';
import fogImg from '../../resources/img/fog.png';
import sleetImg from '../../resources/img/sleet.png';
import clearImg from '../../resources/img/day_clear.png';

export const getImg = (weather) => {
    const value = weather.toLowerCase();
    switch (value) {
        case 'clouds':
            return cloudyImg;
        case 'overcast':
            return overcastImg;
        case 'rain':
        case 'drizzle':
            return rainImg;
        case 'snow':
            return snowImg;
        case 'thunderstorm':
            return thunderImg;
        case 'storm':
            return rainThunderImg;
        case 'fog':
        case 'mist':
        case 'haze':
            return fogImg;
        case 'sleet':
            return sleetImg;
        case 'clear':
            return clearImg;
        default:
            return null;
    }
};


