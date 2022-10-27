import { useState } from "react";
import useGetLocation from "../../hooks/useGetLocation";
import LocationPreview from "../LocationPreview";
import "./LocationSearch.css";

export default function LocationSearch() {
  // array of location objects
  const [locationTerm, setLocationTerm] = useState("");
  const { location, error } = useGetLocation(locationTerm);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocationTerm(locationTerm);
  };

  return (
    <section className="locations-container">
      <h2 style={{ color: "white" }}>Search Locations</h2>
      <div className="locations">
        <form onSubmit={handleSubmit}>
          <div className="locations-input">
            <input
              value={locationTerm}
              onChange={(e) => setLocationTerm(e.target.value)}
              placeholder="E.g. Gear World"
              type="text"
            />
            <button>Search</button>
          </div>
        </form>

        {location?.map(function (l) {
          // the component is a <Link> to the location detail page with that id
          return <LocationPreview key={l.id} location={l} />;
        })}
        {error && <p>{error}</p>}
      </div>
    </section>
  );
}
