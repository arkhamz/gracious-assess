import { useState, useEffect } from "react";
import axios from "axios";

export default function useGetLocation(){

    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    async function getLocation(term){

        setError(null);
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/location/?name=${term}`);
            const fetchedLocations = response.data.results;

            if(!fetchedLocations){
                throw new Error("No locations exist");
            } else{
                setLocation(fetchedLocations);
            }
            
        } catch (e) {
            console.log(e);
            console.log(e.message);
            setError(null);
        }
    }

    return {location,error,getLocation}


}


