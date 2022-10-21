import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGetCharacter from "../hooks/useGetCharacter";
import "./Character.css"

export default function Character(){

    const {id} = useParams();
    const {character,error,getCharacter} = useGetCharacter();

    useEffect(function(){

        getCharacter(id);

    },[])

    

    

    return (
        <>
        {character && (
            <article className="character-container">
            <div className="character-profile">
                <img src={character.image} alt="character profile"/>
            </div>
            <div className="character-content">
                <h2 className="char-name"> {character.name}</h2>
                <p>Status: <span>{character.status}</span></p>
                <p>Species: <span>{character.species}</span></p>
                <p>Gender: <span>{character.gender}</span></p>
                <p>Origin: <span>{character.origin.name}</span></p>
                <p>Last seen: <span>{character.location.name}</span></p>
             
            </div>
        </article>
        )}</>
    )
}