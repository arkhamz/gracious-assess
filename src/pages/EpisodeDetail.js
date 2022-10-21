import { useState, useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import useGetEpisodeCharacters from "../hooks/useGetEpisodeCharacters";
import CharacterCard from "../components/CharacterCard";
import "./EpisodeDetail.css";

// fetches episode along with characters
export default function EpisodeDetail(){

    const {id} = useParams();
    const {episode,error,getEpisodeCharacters} = useGetEpisodeCharacters();

    useEffect(function(){

        getEpisodeCharacters(id);
        
    },[]);

    // console.log(episode);

    return (
        <>
            {episode && (
                <section className="episode-detail">
                <div className="episode-info">
                    <h1>{episode.name} {`(${episode.episode})`}</h1>
                    <h3>{episode.air_date}</h3>
                </div>
        
                <ul className="episode-characters">
                    {episode.characters && episode.characters.map(function(char){
                        return <Link key={char.id} to={`/characters/${char.id}`} style={{textDecoration:"none"}}>
                            <CharacterCard char={char} />
                        </Link>
                    })}
                </ul>
            </section>
            )}
        </>
    )

}