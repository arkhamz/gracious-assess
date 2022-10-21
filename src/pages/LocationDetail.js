import axios from "axios"
import { useEffect, useState } from "react"
import { useParams,Link } from "react-router-dom";
import CharacterCard from "../components/CharacterCard";
import "./LocationDetail.css";
import poopy from "../assets/poopy2.png"

export default function LocationDetail(){

    const {id} = useParams();
    const [residents,setResidents] = useState(null);
    const [location,setLocation] = useState(null);
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10)

    useEffect(function(){

        // function that gets all residents
        async function getLocationWithResidents(){

           try {
            // get location
            const locationResponse = await axios.get(`https://rickandmortyapi.com/api/location/${id}`);
            setLocation(locationResponse.data);
            // get residents
            const locationResidents = locationResponse.data.residents;
            // get residents all at once
            const promiseArr = locationResidents.map(function(i){
                return axios.get(`${i}/?status=alive`);
            });
            const residentResponse = await Promise.all(promiseArr);
            const modified = residentResponse.map(char => char.data);
            const alive = modified.filter(char => "alive" === char.status.toLowerCase());
            setResidents(alive);
          
           } catch (e) {
            console.log(e);
            console.log(e.message);
           }
        }
        getLocationWithResidents(); 
    },[]);

    console.log(location);
    console.log(residents);

    // pagination e.g. page 1 with 10 things

    const indexOfLastPost =  currentPage * postsPerPage; 
    // e.g. 1 * 10 = 10 - 10 (will always be 1 more than actual, due to n-1 of slice)
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // e.g. 10 - 10 = 0
    const currentPosts = residents && residents.slice(indexOfFirstPost, indexOfLastPost);

    function handleClick(direction){

        if(direction === "next"){
            setCurrentPage(p => p + 1);
        } else if (direction === "previous"){
            setCurrentPage(p => p - 1);
        }

    }

    const canGoNext = currentPage >= 1 && currentPosts && currentPosts.length >= postsPerPage;
    // console.log(currentPosts.length);
    // console.log(postsPerPage);

    const canGoBack = currentPage >= 2;

    return (
        <>
        {location && residents ? (
            <section className="residents">
                <h1>{location.name}</h1>

                <div className="resident-list">
                {currentPosts.length > 0 && currentPosts.map(function(r){
                    return <Link to={`/characters/${r.id}`} key={r.id} >
                     <CharacterCard char={r}/>
                    </Link>
                })}
                </div>

                <div className="pagination-buttons">
                    {canGoBack && <button onClick={e => handleClick("previous") }>Previous</button>}
                    {canGoNext && <button onClick={e => handleClick("next") }>Next</button>}
                </div>

                {residents.length < 1 && (
                    <div className="empty">
                         <img className="poopy" src={poopy} alt="Mr poopy butthole" />
                         <h1>Nothing to see here...</h1>
                    </div>
                )}
        </section>
        ) : (<div>
            <img className="poopy" src={poopy} alt="Mr poopy butthole" />

            <h1 style={{fontFamily: "wubba", color: "yellowgreen"}}>Nothing to see here...</h1>


        </div>)}
        </>
    )
}