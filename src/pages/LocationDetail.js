import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import CharacterCard from "../components/CharacterCard";
import "./LocationDetail.css";
import poopy from "../assets/poopy2.png"


export default function LocationDetail(){

    const {id} = useParams();
    const [residents,setResidents] = useState(null);
    const [location,setLocation] = useState(null);

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


    return (
        <>
        {location && residents ? (
            <section className="residents">
                <h1>{location.name}</h1>
                <div className="resident-list">
                {residents.length > 0 && residents.map(function(r){
                    return <CharacterCard key={r.id} char={r}/>
                })}
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