import axios from "axios"
import { useEffect, useState } from "react"

export default function Location({location}){

    const [residents,setResidents] = useState(null);

    useEffect(function(){

        // function that gets all residents
        async function getResidents(){
           try {
            //
            const promiseArr = location.residents.map(async function(i){
                return axios.get(`${i}/?status=alive`);
            });
            const response = await Promise.all(promiseArr);
            const modified = response.map(char => char.data);
            const alive = modified.filter(char => "alive" === char.status.toLowerCase());
            setResidents(alive);
          
           } catch (e) {
            console.log(e);
            console.log(e.message);
            
           }
        }

        if(location){
            getResidents();
        }
    },[]);

    // console.log(location);

    return <div>
        <h2>{location && location.name}</h2>
        <ul className="residents">
            {residents && residents.map(function(resident){
                return <li key={resident.id}>{resident.name}</li>
            })}
        </ul>
        

    </div>
}