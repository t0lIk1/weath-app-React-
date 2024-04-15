import './EntWindow.scss';

const EntWindow = () => {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            localStorage.setItem("apikey", e.target.value);
        }
    };

    return (
        <div className="enter">
            <h2 className="enter__title">Enter Api key</h2>
            <span className="enter__text">The key can be obtained from <a className="text__link" href="https://openweathermap.org/">openweathermap</a></span>
            <input type="text" placeholder='Api key ' className='enter__input' onKeyDown={handleKeyDown} />
        </div>
    );
};

export default EntWindow;