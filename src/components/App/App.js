// App.js
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';

import MainPage from "../../page/MainPage"
import EntWindow from '../EntWindow/EntWindow';
import BasicInput from '../BasicInput/BasicInput';

const App = () => {
  return (
    <Router basename="/weath-app-React-">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Enter" element={<EntWindow />} />
      </Routes>
    </Router>
  );
}

export default App;
