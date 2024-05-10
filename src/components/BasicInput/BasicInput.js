import geo from '../../resources/img/svg/icons8-маркер-50 2.svg';
import magi from '../../resources/img/svg/icons8-лупа-64 3.svg';
import './BasicInput.scss';
import useWeatherService from '../../services/WeatherService';
import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
const BasicInput = () => {
  const { getPosition, getCoord } = useWeatherService();
  const [meaning, setMeaning] = useState('');
  const [data, setData] = useState([]);
  const debouncedSearchTerm = useDebounce(meaning, 1000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      updateCoord(debouncedSearchTerm)
    }
    setData([]);
  }, [debouncedSearchTerm]);

  const updateCoord = async (town) => {
    const data = await getCoord(town);
    setData(data);
  }


  return (
    <>
      <form action="#1" className="search-form">
        <img src={magi} alt="magi" className="search-form__img" />
        <input
          type="text"
          className="search-form__input"
          placeholder="Search for place"
          onChange={(e) => { setMeaning(e.target.value) }} />
        <img src={geo} alt="geo" className="search-form__img-mark" onClick={getPosition} />
      </form>
      <div className='dorpdown'>
        {
          data.map((item, i) => {
            return (
              <div className='dropdown_block' key={i}>
                <span className="dropdown_town">{item.name}</span>
                <span className="dropdown_country">{item.country}</span>
              </div>
            )
          })
        }
      </div>
    </>
  );
}


export default BasicInput;