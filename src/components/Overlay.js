import "./Overlay.css"

export default function Overlay({closeOverlay}){


    return <article className="overlay">
        <div className="overlay-content">
            <iframe src="https://www.youtube.com/embed/JGaBU5cKluU?autoplay=1&start=4"   autoPlay title="YouTube video player" allowFullScreen frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  
            <button onClick={closeOverlay}>X</button>     
         </div>

    </article>
}