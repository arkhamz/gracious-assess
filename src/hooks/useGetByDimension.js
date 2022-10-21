import { useState, useEffect } from "react";
import axios from "axios";

export default function useGetByDimension(){

    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    async function getByDimension(term){

        setError(null);
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/location/?dimension=${term}`);
            const fetchedLocations = response.data.results;
            console.log("fetched dimensions", fetchedLocations)

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

    return {location,error,getByDimension}


}