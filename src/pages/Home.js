import LocationSearch from "../components/LocationSearch";
import DimensionSearch from "../components/DimensionSearch";
import "./Home.css";

export default function Home(){

   return (
    <section className="home-container">
        {/* <h2>Home</h2> */}
        <div className="home-filters">
            <LocationSearch/>
            <DimensionSearch />
        </div>
        
    </section>
   )
}