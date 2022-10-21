import { useEffect, useState } from "react"
import axios from "axios";
import Location from "../components/Location";
import useGetLocation from "../hooks/useGetLocation";
import useGetByDimension from "../hooks/useGetByDimension";
import LocationPreview from "../components/LocationPreview";
import LocationSearch from "../components/LocationSearch";
import DimensionSearch from "../components/DimensionSearch";


export default function Home(){

    // array of location objects
    // const [locationTerm,setLocationTerm] = useState("");
    // const [dimensionTerm,setDimensionTerm] = useState("");
    // const {location,error,getLocation} = useGetLocation();
    // const {location:dimension,error:dimensionError,getByDimension} = useGetByDimension();
    
    // function handleSubmitLocation(searchTerm){
    //     getLocation(searchTerm.toLowerCase());
    // }

    // function handleSubmitDimension(searchTerm){
    //     getByDimension(searchTerm.toLowerCase());
    // }

    // console.log(location);



   return (
    <section className="home">
        <h2>Home</h2>
        <div className="home-filters">
            <LocationSearch/>
            <DimensionSearch />
        </div>
        
    </section>
   )
}