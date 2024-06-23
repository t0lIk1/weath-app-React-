import ErrorMassege from "../ErrorMassage/ErrorMassage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import rose from "../../resources/img/svg/icons8-роза-ветров-50 2.svg";
import "swiper/css/navigation";
import "./HorlyInfo.scss";
import { Skeleton } from "@mui/material";

const ViewSkeleton = () => {
  return (
    <div className="skeletonHourly">
      <Skeleton
        sx={{ bgcolor: "grey.800" }}
        variant="rectangular"
        width="100%"
        height="229px"
      />
    </div>
  );
};

const HorlyInfo = ({ weather, isLoading, hasError }) => {
  console.log(`weather:${weather}`);
  console.log(weather);

  const loading = isLoading ? <ViewSkeleton /> : null;
  const errorMassege = hasError ? <ErrorMassege /> : null;
  const content = !(isLoading || hasError) ? (
    <Hourly weather={weather} />
  ) : null;

  return (
    <div className="hourly">
      {loading}
      {errorMassege}
      {content}
    </div>
  );
};

const Hourly = ({ weather }) => {
  return (
    <Swiper
      className="swiperHourly"
      spaceBetween={15}
      slidesPerView={"auto"}
      modules={[Navigation]}
      // wrapperClass='hourly_wrapper'
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      breakpoints={{
        // mobile + tablet - 320-990
        320: {
          slidesPerView: 1,
        },
        1000: {
          slidesPerView: 2,
        },
        // desktop >= 991
        1600: {
          slidesPerView: 3,
        },
      }}
    >
      <div className="swiper_wrapper">
        {weather.hourly.map((hour, i) => (
          <SwiperSlide key={i}>
            <span className="swiper-slide__days">{hour.main}</span>
            <span className="swiper-slide__time">{hour.dt}</span>
            <img src={rose} alt="" className="swiper-slide__ico-direct" />
            <span className="swiper-slide__direction">{hour.windDeg}</span>
            <img src={hour.img} alt="" className="swiper-slide__weather-img" />
            <span className="swiper-slide__temp">{hour.temp}℃</span>
          </SwiperSlide>
        ))}
      </div>
    </Swiper>
  );
};

export default HorlyInfo;
