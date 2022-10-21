import { useState, useEffect } from "react";
import useGetEpisodes from "../hooks/useGetEpisodes";


export default function Episodes(){

    const {episodes,error,getEpisodes} = useGetEpisodes();

    useEffect(function(){

        getEpisodes();
    },[]);

    console.log(episodes);

    

}