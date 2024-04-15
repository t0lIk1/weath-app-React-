import './EntWindow.scss';


const EntWindow = () => {
    return (
        <div className="enter">
            <h2 className="enter__title">Enter Api key</h2>
            <span className="enter__text">The key can be obtained from <a className="text__link" href="https://openweathermap.org/">openweathermap</a></span>
            <input type="text" placeholder='Api key ' className='enter__input' />
        </div>
    )
}

export default EntWindow;