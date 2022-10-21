import { useState, useEffect } from "react";
import axios from "axios";

export default function useGetEpisodes(){

    const [episodes, setEpisodes] = useState(null);
    const [error, setError] = useState(null);

    async function getEpisodes(){

        setError(null);
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/episode`);
            const fetchedEpisodes = response.data.results;

            if(!fetchedEpisodes){
                throw new Error("No locations exist");
            } else{
                setEpisodes(fetchedEpisodes);
                setError(null);
            }
            
        } catch (e) {
            console.log(e);
            console.log(e.message);
            setError(e.message);
        }
    }

    return {episodes,error,getEpisodes}


}
