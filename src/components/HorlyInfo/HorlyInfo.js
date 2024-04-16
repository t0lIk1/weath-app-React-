import './swiper-custom.css';
import Skeleton from '@mui/material/Skeleton';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import sunny from '../../resources/img/day_clear.png'
import { Component } from 'react';

class HorlyInfo extends Component {
    state = {
        weather: [],
        error: false,
        loading: true
    }
    render() {
        const { loading } = this.state;

        return (
            <Swiper
                modules={[Navigation]}
                spaceBetween={55}
                slidesPerView={'auto'}
                onSwiper={(swiper) => console.log(swiper)}
                navigation
                onSlideChange={() => console.log('slide change')}
            >
                {[...Array(8)].map((_, index) => (
                    <SwiperSlide key={index}>
                        {loading ? (
                            <Skeleton
                                sx={{ bgcolor: 'grey.800', borderRadius: '8px' }}
                                variant="rectangular"
                                animation="wave"
                                rounded
                            >
                                <span className="swiper-slide__days">Sun</span>
                                <span className="swiper-slide__time">15:00</span>
                                <img src={sunny} alt="" className="swiper-slide__ico-direct" />
                                <span className="swiper-slide__direction">NE</span>
                                <img src={sunny} alt="" className="swiper-slide__weather-img" />
                                <span className="swiper-slide__temp">26℃</span>
                            </Skeleton>
                        ) : (
                            <>
                                <span className="swiper-slide__days">Sun</span>
                                <span className="swiper-slide__time">15:00</span>
                                <img src={sunny} alt="" className="swiper-slide__ico-direct" />
                                <span className="swiper-slide__direction">NE</span>
                                <img src={sunny} alt="" className="swiper-slide__weather-img" />
                                <span className="swiper-slide__temp">26℃</span>
                            </>
                        )}
                    </SwiperSlide>
                ))}
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </Swiper>
        );
    }
}

export default HorlyInfo;