import { useState } from "react";
import "./CharacterCard.css"

export default function CharacterCard({char}){

    return (
        <>
        {char && (
            <article className="char-container">
            <div className="top">
                <img src={char.image} alt="character card"/>
            </div>
            <div className="bottom">
                <h4 className="char-name"> {char.name}</h4>
                <p>Status: {char.status}</p>
            </div>
        </article>
        )}</>
    )
}