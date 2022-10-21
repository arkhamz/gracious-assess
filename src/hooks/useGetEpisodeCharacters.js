import { useState, useEffect } from "react";
import axios from "axios";

export default function useGetEpisodeCharacters(){

    const [episode, setEpisode] = useState(null);
    const [error, setError] = useState(null);

    async function getEpisodeCharacters(id){

        setError(null);
        try {
            // get episode
            const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
            const fetchedEpisode = response.data;

            if(!fetchedEpisode) throw new Error("Episode not found");

            // get episode's characters

            const promiseArr = fetchedEpisode.characters.map(function(url){
                return axios.get(url);
            })
            const charResponse = await Promise.all(promiseArr);
            if(!charResponse) throw new Error("Characters could not be fetched");
            const characters = charResponse.map(c =>  c.data);
           
            setEpisode({...fetchedEpisode, characters:characters});
            setError(null);
            
        } catch (e) {
            console.log(e);
            console.log(e.message);
            setError(e.message);
        }
    }

    return {episode,error,getEpisodeCharacters}


}
