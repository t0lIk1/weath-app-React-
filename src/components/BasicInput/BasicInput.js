import geo from '../../resources/img/svg/icons8-маркер-50 2.svg';
import magi from '../../resources/img/svg/icons8-лупа-64 3.svg';
import './BasicInput.scss';
import useWeatherService from '../../services/WeatherService';
import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
const BasicInput = ({ responsCoord }) => {
  const { getPosition, getCoord } = useWeatherService();
  const [meaning, setMeaning] = useState('');
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);
  const debouncedSearchTerm = useDebounce(meaning, 1000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      updateCoord(debouncedSearchTerm)
    }
    setShowData(false);
    setData([]);
  }, [debouncedSearchTerm]);

  const updateCoord = async (town) => {
    console.log(town)
    const coord = await getCoord(town);
    if (coord.length) {
      setData(coord);
      console.log(coord);
      setShowData(true);
    }
  }

  const handleChange = (event) => {
    setMeaning(event.target.value)
  }

  const navigate = useNavigate();
  const redirect = (lat, lon) => {
    navigate('/')
    responsCoord(lat, lon);
  }

  return (
    <div className="form">
      <form className="search-form">
        <input
          type="text"
          className="search-form__input"
          placeholder="Search for place"
          style={showData ? { borderRadius: '20px 20px 0 0' } : {}}
          onChange={handleChange} />
        <img src={magi} alt="magi" className="search-form__img" />
        <img src={geo} alt="geo" className="search-form__img-mark" onClick={getPosition} />
      </form>
      {
        showData && <div className='dropdown' >
          <div className="line"></div>
          {
            data.map((item, i) => {
              return (
                <div className='dropdown_block' key={i} onClick={(e) => redirect(item.lat, item.lon)}>
                  <span className="dropdown_town">{item.name}</span>
                  <span className="dropdown_country">{item.country}</span>
                </div>
              )
            })
          }
        </div>
      }
    </div>
  );
}


export default BasicInput;