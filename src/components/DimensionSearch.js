import { useState } from "react"
import useGetByDimension from "../hooks/useGetByDimension";
import LocationPreview from "./LocationPreview";
import "./DimensionSearch.css"

export default function DimensionSearch(){

    const [dimensionTerm,setDimensionTerm] = useState("");
    const {location:dimension,error:dimensionError,getByDimension} = useGetByDimension();


    function handleSubmitDimension(searchTerm){
        getByDimension(searchTerm.toLowerCase());
    }

   return (
    <section className="dimensions-container">
        <h2 style={{color: "white"}}>Search by Dimensions</h2>
        <div className="dimensions">
            <form onSubmit={e => {
                e.preventDefault();
                handleSubmitDimension(dimensionTerm);
            }}>
               <div className="dimensions-input">
               <input value={dimensionTerm} onChange={e => setDimensionTerm(e.target.value)} placeholder="E.g. replaced dimension" type="text" />
                <button>Search</button>
               </div>
            </form>

            {dimension && dimension.map(function(l){
                // the component is a <Link> to the location detail page with that id
                return <LocationPreview key={l.id} location={l} />
            })}
        
            {dimensionError && <p>{dimensionError}</p>}
        </div>
        
    </section>
   )
}