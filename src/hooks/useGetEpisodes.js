import { useState, useEffect } from "react";
import axios from "axios";

export default function useGetEpisodes(){

    const [episodes, setEpisodes] = useState(null);
    const [error, setError] = useState(null);
    const [maxPages,setMaxPages] = useState(null);

    async function getEpisodes(page){

        setError(null);
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`);
            const fetchedEpisodes = response.data.results;
            const pages = response.data.info.pages

            if(!fetchedEpisodes){
                throw new Error("No locations exist");
            } else{
                setEpisodes(fetchedEpisodes);
                setMaxPages(pages);
                setError(null);
            }
            
        } catch (e) {
            console.log(e);
            console.log(e.message);
            setError(e.message);
        }
    }

    return {episodes,error,getEpisodes, maxPages}


}
