import BasicInfo from "../BasicInfo/BasicInfo";
// import EntWindow from "../EntWindow/EntWindow";
import HorlyInfo from "../HorlyInfo/HorlyInfo";
import CurrentInfo from "../CurrentInfo/CurrentInfo";



const App = () => {
    return (
        <div className="container">
            <BasicInfo />
            <div className="right">
                <HorlyInfo />
                <CurrentInfo />
            </div >
        </div >
    )
}

export default App;