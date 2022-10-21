import { useState } from "react";
import axios from "axios";

export default function useGetCharacter(){

    const [character, setCharacter] = useState(null);
    const [error, setError] = useState(null);

    async function getCharacter(id){

        setError(null);
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
            const fetchedCharacter = response.data;

            if(!fetchedCharacter){
                throw new Error("No such character exists");
            } else{
                setCharacter(fetchedCharacter);
            }
            
        } catch (e) {
            console.log(e);
            console.log(e.message);
            setError(e.message);
        }
    }

    return {character,error,getCharacter}


}


