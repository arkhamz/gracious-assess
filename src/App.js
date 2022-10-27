import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import LocationDetail from "./pages/LocationDetail";

import Navbar from "./components/Navbar";
import Episodes from "./pages/Episodes";
import Character from "./pages/Character/Character";
import EpisodeDetail from "./pages/EpisodeDetail/EpisodeDetail";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/location/:id" element={<LocationDetail />} />
        <Route path="/characters/:id" element={<Character />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episodes/:id" element={<EpisodeDetail />} />
      </Routes>
    </div>
  );
}

export default App;
