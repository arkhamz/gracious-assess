import { useState } from "react";
import "./CharacterCard.css"
import { Link } from "react-router-dom";

export default function CharacterCard({char}){

    return (
        <>
        {char && (
            <Link style={{textDecoration: "none"}} to={`/characters/${char.id}`}>
                <article className="char-container">
                    <div className="top">
                        <img src={char.image} alt="character card"/>
                    </div>
                    <div className="bottom">
                        <p style={{color: "black", fontFamily:"wubba"}} className="char-name"> {char.name}</p>
                        <p>{char.status}</p>
                    </div>
                </article>
            </Link>
        )}</>
    )
}