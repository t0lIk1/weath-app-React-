// App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from "../../page/MainPage"
import EntWindow from '../EntWindow/EntWindow';
import BasicInput from '../BasicInput/BasicInput';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Enter" element={<EntWindow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
