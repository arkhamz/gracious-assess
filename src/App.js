import './App.css';
import Home from './pages/Home';
import {Routes,Route} from "react-router-dom"
import LocationDetail from './pages/LocationDetail';
import Character from './pages/Character';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route  path="/location/:id" element={<LocationDetail/>} />
        <Route path="/characters/:id" element={<Character/>} />
      </Routes>

    </div>
  );
}

export default App;
