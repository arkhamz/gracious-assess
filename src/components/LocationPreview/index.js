import { Link } from "react-router-dom";
import "./LocationPreview.css";

export default function LocationPreview({ location }) {
  // ;

  return (
    <Link className="location-prev" to={`/location/${location.id}`}>
      <h2>{location.name}</h2>
    </Link>
  );
}
