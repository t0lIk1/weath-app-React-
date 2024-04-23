
// import './CurrentInfo.scss';
// import sunSetIco from '../../resources/img/svg/sunset-white 1.svg'
// import sunRiseIco from '../../resources/img/svg/sunrise-white 1.svg'
// import wind from '../../resources/img/svg/wind 1.svg'
// import windDegIco from '../../resources/img/svg/icons8-роза-ветров-50 2.svg'
// import humadilityIco from '../../resources/img/svg/pressure-white 1-1.svg'
// import uviIco from '../../resources/img/svg/icons8-uv-index-64 1.svg'
// import pressureIco from '../../resources/img/svg/pressure-white 1.svg'

// const CurrentInfo = ({ props }) => {
//     const { humadility, pressure, uvi, windDeg, windSpeed, sunrise, sunset } = props;
//     return (
//         <div className="current-info__grid">
//             <div className="grid__item">
//                 <div className="grid__item__name">Sunrise & Sunset</div>
//                 <div className="grid__item__sun">
//                     <div className="sun-sunrise">
//                         <img src={sunRiseIco} alt="img" className="sunrise-img" />
//                         <span className="sunrise-info">{sunrise} AM</span>
//                     </div>
//                     <div className="sun-sunset">
//                         <img src={sunSetIco} alt="img" className="sunset-img" />
//                         <span className="sunset-info">{sunset} PM</span>
//                     </div>
//                 </div>
//             </div>
//             <div className="grid__item">
//                 <div className="item__name">Wind Speed</div>
//                 <img src={wind} alt="img" className="item__img" />
//                 <span className="item__info">{windSpeed}km/h</span>
//             </div>
//             <div className="grid__item">
//                 <div className="item__name">Pressure</div>
//                 <img src={pressureIco} alt="img" className="item__img" />
//                 <span className="item__info">{pressure}hPa</span>
//             </div>
//             <div className="grid__item">
//                 <div className="item__name">UV index</div>
//                 <img src={uviIco} alt="img" className="item__img" />
//                 <span className="item__info">{uvi}</span>
//             </div>
//             <div className="grid__item">
//                 <div className="item__name">Direction of the wind</div>
//                 <img src={windDegIco} alt="img" className="item__img" />
//                 <span className="item__info">{windDeg}</span>
//             </div>
//             <div className="grid__item">
//                 <div className="item__name">Humidity</div>
//                 <img src={humadilityIco} alt="img" className="item__img" />
//                 <span className="item__info">{humadility}</span>
//             </div>

//         </div>
//     )
// }


// export default CurrentInfo;