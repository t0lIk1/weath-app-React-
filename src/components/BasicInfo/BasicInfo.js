import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Spinner from '../Spiner/Spiner';
import ErrorMassege from '../ErrorMassage/ErrorMassage';
import BasicInput from '../BasicInput/BasicInput';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/pagination';
import 'swiper/css';
import './BasicInfo.scss';

const ViewSkeleton = () => {
  return (
    <div className='skeleton'>
      <Skeleton sx={{ bgcolor: 'grey.800' }} variant="rectangular" width="100%" height="41px" style={{ borderRadius: "100px" }} className="skeleton_input" />
      <div className="skeleton_block">
        <Skeleton sx={{ bgcolor: 'grey.800' }} variant="rectangular" width="80%" height="auto" className="basic__img" />
        <div className="skeleton_text-block">
          <Skeleton sx={{ bgcolor: 'grey.800' }} variant="text" width="100%" height="40px" className="basic__img" />
          <Skeleton sx={{ bgcolor: 'grey.800' }} variant="text" width="100%" height="30px" className="basic__img" />
          <Skeleton sx={{ bgcolor: 'grey.800' }} variant="text" width="100%" height="20px" className="basic__img" />
          <Skeleton sx={{ bgcolor: 'grey.800' }} variant="text" width="100%" height="40px" className="basic__img" />
          <Skeleton sx={{ bgcolor: 'grey.800' }} variant="text" width="100%" height="30px" className="basic__img" />
          <Skeleton sx={{ bgcolor: 'grey.800' }} variant="text" width="100%" height="20px" className="basic__img" />

        </div>
      </div>

      <div className="line "></div>

      <div className="skeleton_bottom">
        <Skeleton sx={{ bgcolor: 'grey.800' }} variant="rectangular" width="100%" height="100%" className="basic__img" />
        <Skeleton sx={{ bgcolor: 'grey.800' }} variant="rectangular" width="100%" height="100%" className="basic__img" />
        <Skeleton sx={{ bgcolor: 'grey.800' }} variant="rectangular" width="100%" height="100%" className="basic__img" />
      </div>

    </div>);
};

const View = ({ weather }) => {
  return (
    <>
      <BasicInput />
      <div className="basic">
        <img src={(weather.current.img)} alt="weather" className="basic__img" />
        <div className="basic-info">
          <h1 className="basic-info__town">{weather.current.name}</h1>
          <span className="basic-info__date">{weather.current.dt}</span>
          <h2 className="basic-info__weather">{weather.current.main}</h2>
          <h2 className="basic-info__temp">{weather.current.temp}°C</h2>
          <h2 className="basic-info__feelslike">Feels like: {weather.current.feelsLike}°C</h2>
        </div>
      </div>

      <div className="line"></div>

      <Swiper className="days-forecast"
        wrapperClass="days-forecast__list"
        slideClass="days-forecast__item"
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView={'3'}
        direction={'vertical'}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}>
        <div className="days-forecast__list">
          {weather.daily.map((day, index) => (
            <SwiperSlide key={index} className="days-forecast__item">
              <img src={day.img} alt="weather" className="days-forecast__img" />
              <span className="days-forecast__temp text">{day.temp}°C</span>
              <span className="days-forecast__date text">{day.dt}</span>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </>
  );
};

const BasicInfo = ({ weather, isLoading, hasError  }) => {
  console.log(weather);
  // Check if weatherData.weather is defined before rendering the View component
  const content = !(isLoading || hasError) ? <View weather={weather} /> : null;
  const loading = isLoading ? <ViewSkeleton /> : null;
  const errorMessage = hasError ? <ErrorMassege /> : null;

  return (
    <div className='info__block'>
      {loading}
      {errorMessage}
      {content}
    </div>
  );
}

export default BasicInfo;


