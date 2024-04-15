
import './HorlyInfo.scss';
import './swiper-custom.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import sunny from '../../resources/img/day_clear.png'


const HorlyInfo = () => {
    return (

        <Swiper
            modules={[Navigation]}
            spaceBetween={15}
            slidesPerView={3.5}
            onSwiper={(swiper) => console.log(swiper)}
            navigation
            onSlideChange={() => console.log('slide change')}
        >

            <SwiperSlide>
                <span className="swiper-slide__days">Sun</span>
                <span className="swiper-slide__time">15:00</span>
                <img src={sunny} alt="" className="swiper-slide__ico-direct" />
                <span className="swiper-slide__direction">NE</span>
                <img src={sunny} alt="" className="swiper-slide__weather-img" />
                <span className="swiper-slide__temp">26℃</span>
            </SwiperSlide>
            <SwiperSlide>
                <span className="swiper-slide__days">Sun</span>
                <span className="swiper-slide__time">15:00</span>
                <img src={sunny} alt="" className="swiper-slide__ico-direct" />
                <span className="swiper-slide__direction">NE</span>
                <img src={sunny} alt="" className="swiper-slide__weather-img" />
                <span className="swiper-slide__temp">26℃</span>
            </SwiperSlide>
            <SwiperSlide>
                <span className="swiper-slide__days">Sun</span>
                <span className="swiper-slide__time">15:00</span>
                <img src={sunny} alt="" className="swiper-slide__ico-direct" />
                <span className="swiper-slide__direction">NE</span>
                <img src={sunny} alt="" className="swiper-slide__weather-img" />
                <span className="swiper-slide__temp">26℃</span>
            </SwiperSlide>
            <SwiperSlide>
                <span className="swiper-slide__days">Sun</span>
                <span className="swiper-slide__time">15:00</span>
                <img src={sunny} alt="" className="swiper-slide__ico-direct" />
                <span className="swiper-slide__direction">NE</span>
                <img src={sunny} alt="" className="swiper-slide__weather-img" />
                <span className="swiper-slide__temp">26℃</span>
            </SwiperSlide>
            <SwiperSlide>
                <span className="swiper-slide__days">Sun</span>
                <span className="swiper-slide__time">15:00</span>
                <img src={sunny} alt="" className="swiper-slide__ico-direct" />
                <span className="swiper-slide__direction">NE</span>
                <img src={sunny} alt="" className="swiper-slide__weather-img" />
                <span className="swiper-slide__temp">26℃</span>
            </SwiperSlide>
            <SwiperSlide>
                <span className="swiper-slide__days">Sun</span>
                <span className="swiper-slide__time">15:00</span>
                <img src={sunny} alt="" className="swiper-slide__ico-direct" />
                <span className="swiper-slide__direction">NE</span>
                <img src={sunny} alt="" className="swiper-slide__weather-img" />
                <span className="swiper-slide__temp">26℃</span>
            </SwiperSlide>
            <SwiperSlide>
                <span className="swiper-slide__days">Sun</span>
                <span className="swiper-slide__time">15:00</span>
                <img src={sunny} alt="" className="swiper-slide__ico-direct" />
                <span className="swiper-slide__direction">NE</span>
                <img src={sunny} alt="" className="swiper-slide__weather-img" />
                <span className="swiper-slide__temp">26℃</span>
            </SwiperSlide>
            <SwiperSlide>
                <span className="swiper-slide__days">Sun</span>
                <span className="swiper-slide__time">15:00</span>
                <img src={sunny} alt="" className="swiper-slide__ico-direct" />
                <span className="swiper-slide__direction">NE</span>
                <img src={sunny} alt="" className="swiper-slide__weather-img" />
                <span className="swiper-slide__temp">26℃</span>
            </SwiperSlide>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
        </Swiper>
    )
}

export default HorlyInfo