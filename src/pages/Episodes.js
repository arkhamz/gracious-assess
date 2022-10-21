import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGetEpisodes from "../hooks/useGetEpisodes";
import "./Episodes.css"

export default function Episodes(){

    const {episodes,error,getEpisodes, maxPages} = useGetEpisodes();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage,setPostsPerPage] = useState(10);

    useEffect(function(){

        getEpisodes(currentPage);
    },[currentPage]);

    function handleClick(direction){
        if(direction === "next"){
            setCurrentPage(p => p + 1);
        } else if (direction === "previous"){
            setCurrentPage(p => p - 1);
        }
    }

    // console.log(maxPages)

    return (
        <section className="episodes">
            <ul className="episode-list">
                {episodes && episodes.map(function(episode){
                    return <Link to={`/episodes/${episode.id}`} style={{textDecoration:"none", color: "inherit"}} key={episode.id}>
                    <article className="episode-prev">
                        <h4>{episode.name}</h4>
                        <p>{episode.episode}</p>
                    </article>
                    </Link>
                })}
            </ul>
            <div className="pagination-buttons">
                    {currentPage > 1 && <button onClick={e => handleClick("previous") }>Previous</button>}
                    { currentPage < maxPages && <button onClick={e => handleClick("next") }>Next</button>}
                </div>
        </section>
    )

    

}