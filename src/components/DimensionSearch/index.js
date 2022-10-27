import { useState } from "react";
import useGetByDimension from "../../hooks/useGetByDimension";
import LocationPreview from "../LocationPreview";
import "./DimensionSearch.css";

export default function DimensionSearch() {
  const [dimensionTerm, setDimensionTerm] = useState("");
  const { dimension } = useGetByDimension(dimensionTerm);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDimensionTerm(dimensionTerm);
  };

  return (
    <section className="dimensions-container">
      <h2 style={{ color: "white" }}>Search by Dimensions</h2>
      <div className="dimensions">
        <form onSubmit={handleSubmit}>
          <div className="dimensions-input">
            <input
              value={dimensionTerm}
              onChange={(e) => setDimensionTerm(e.target.value)}
              placeholder="E.g. replaced dimension"
              type="text"
            />
            <button>Search</button>
          </div>
        </form>
        {dimension?.map((dimension) => {
          // the component is a <Link> to the location detail page with that id
          return (
            <LocationPreview
              key={JSON.stringify(dimension)}
              location={dimension}
            />
          );
        })}
      </div>
    </section>
  );
}
