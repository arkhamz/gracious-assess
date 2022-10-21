import { Link } from "react-router-dom";
import "./Navbar.css"


export default function Navbar(){

    return (
        <nav>
            <ul className="links">
                <Link to="/">Home</Link>
                <Link to="/episodes">Episodes</Link>
            </ul>
        </nav>
    )

}