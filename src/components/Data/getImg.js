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
            return { img: cloudyImg };
        case 'overcast':
            return { img: overcastImg };
        case 'rain':
        case 'drizzle':
            return { img: rainImg };
        case 'snow':
            return { img: snowImg };
        case 'thunderstorm':
            return { img: thunderImg };
        case 'storm':
            return { img: rainThunderImg };
        case 'fog':
        case 'mist':
        case 'haze':
            return { img: fogImg };
        case 'sleet':
            return { img: sleetImg };
        case 'clear':
            return { img: clearImg };
        default:
            return { img: null }; // Возвращаем null в случае отсутствия изображения
    }
};
