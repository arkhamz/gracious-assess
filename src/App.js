import './App.css';
import Home from './pages/Home';
import {Routes,Route} from "react-router-dom"
import LocationDetail from './pages/LocationDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route  path="/location/:id" element={<LocationDetail/>} />
      </Routes>

    </div>
  );
}

export default App;
