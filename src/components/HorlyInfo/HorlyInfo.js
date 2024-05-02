import './HorlyInfo.scss';
import Spinner from '../Spiner/Spiner';
import ErrorMassege from '../ErrorMassage/ErrorMassage';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import sunny from '../../resources/img/day_clear.png'

const HorlyInfo = ({ weather, isLoading, hasError }) => {
    console.log(`weather:${weather}`)
    console.log(weather)

    const loading = isLoading? <Spinner /> : null;
    const errorMassege = hasError? <ErrorMassege /> : null;
    const content =!(isLoading || hasError)? <Hourly weather={weather} /> : null;

    return (
        <>
            {loading}
            {errorMassege}
            {content}
        </>
    );
}

const Hourly = ({ weather }) => {
    return (
        <Swiper
            className='hourly'
            spaceBetween={15}
            slidesPerView={3.5}
            wrapperClass='hourly_wrapper'
            onSwiper={(swiper) => console.log(swiper)}
        >
            <div className="swiper_wrapper">
                {weather.hourly.map((hour, i) => (
                    <SwiperSlide key={i}>
                        <span className="swiper-slide__days">{hour.main}</span>
                        <span className="swiper-slide__time">{hour.dt}</span>
                        <img src={sunny} alt="" className="swiper-slide__ico-direct" />
                        <span className="swiper-slide__direction">{hour.windDeg}</span>
                        <img src={hour.img} alt="" className="swiper-slide__weather-img" />
                        <span className="swiper-slide__temp">{hour.temp}℃</span>
                    </SwiperSlide>
                ))}
            </div>
        </Swiper>
    );
}

export default HorlyInfo;
