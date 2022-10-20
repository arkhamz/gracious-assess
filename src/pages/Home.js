import { useEffect, useState } from "react"
import axios from "axios";
import Location from "../components/Location";
import useGetLocation from "../hooks/useGetLocation";
import useGetByDimension from "../hooks/useGetByDimension";
import LocationPreview from "../components/LocationPreview";


export default function Home(){

    // array of location objects
    const [locationTerm,setLocationTerm] = useState("");
    const [dimensionTerm,setDimensionTerm] = useState("");
    const {location,error,getLocation} = useGetLocation();
    const {location:dimension,error:dimensionError,getByDimension} = useGetByDimension();
    
    function handleSubmitLocation(searchTerm){
        getLocation(searchTerm.toLowerCase());
    }

    function handleSubmitDimension(searchTerm){
        getByDimension(searchTerm.toLowerCase());
    }

    // console.log(location);



   return (
    <div>
        <h2>Home</h2>
        <div className="locations">
            <form onSubmit={e => {
                e.preventDefault();
                handleSubmitLocation(locationTerm);
            }}>
                <input value={locationTerm} onChange={e => setLocationTerm(e.target.value)} placeholder="A location e.g. Testicle monster location" type="text" />
                <button>Search</button>
            </form>

            {location && location.map(function(l){
                return <LocationPreview key={l.id} location={l} />
            })}
        
            {error && <p>{error}</p>}
        </div>
        <div className="dimensions">
        <form onSubmit={e => {
                e.preventDefault();
                handleSubmitDimension(dimensionTerm);
            }}>
                <input value={dimensionTerm} onChange={e => setDimensionTerm(e.target.value)} placeholder="A Dimension" type="text" />
                <button>Search</button>
            </form>

            {dimension && dimension.map(function(l){
                return <LocationPreview key={l.id} location={l} />
            })}
           

        </div>
    </div>
   )
}