
import './CurrentInfo.scss';
import sunrise from '../../resources/img/svg/wind 1.svg'

const CurrentInfo = () => {
    return (
        <div className="current-info__grid">
            <div className="grid__item">
                <div className="grid__item__name">Sunrise & Sunset</div>
                <div className="grid__item__sun">
                    <div className="sun-sunrise">
                        <img src={sunrise} alt="img" className="sunrise-img" />
                        <span className="sunrise-info">06:37 AM</span>
                    </div>
                    <div className="sun-sunset">
                        <img src={sunrise} alt="img" className="sunset-img" />
                        <span className="sunset-info">20:37 PM</span>
                    </div>
                </div>
            </div>
            <div className="grid__item">
                <div className="item__name">Wind Speed</div>
                <img src={sunrise} alt="img" className="item__img" />
                <span className="item__info">2km/h</span>
            </div>
            <div className="grid__item">
                <div className="item__name">Pressure</div>
                <img src={sunrise} alt="img" className="item__img" />
                <span className="item__info">997hPa</span>
            </div>
            <div className="grid__item">
                <div className="item__name">UV index</div>
                <img src={sunrise} alt="img" className="item__img" />
                <span className="item__info">5</span>
            </div>
            <div className="grid__item">
                <div className="item__name">Direction of the wind</div>
                <img src={sunrise} alt="img" className="item__img" />
                <span className="item__info">NE</span>
            </div>
            <div className="grid__item">
                <div className="item__name">Humidity</div>
                <img src={sunrise} alt="img" className="item__img" />
                <span className="item__info">41%</span>
            </div>

        </div>
    )
}


export default CurrentInfo;