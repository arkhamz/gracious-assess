import { useParams, Link } from "react-router-dom";

import "./LocationDetail.css";
import poopy from "../../assets/poopy2.png";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import usePageReducer from "../../hooks/usePageReducer";
import useLocationResidents from "../../hooks/useLocationResidents";

export default function LocationDetail() {
  const { id } = useParams();
  const { locationResidents, location, loading } = useLocationResidents(id);
  const [{ currentPage }, dispatch] = usePageReducer();
  const postsPerPage = 10;

  // pagination e.g. page 1 with 10 things

  const indexOfLastPost = currentPage * postsPerPage;
  // e.g. 1 * 10 = 10 - 10 (will always be 1 more than actual, due to n-1 of slice)
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // e.g. 10 - 10 = 0
  const currentPosts =
    locationResidents?.slice(indexOfFirstPost, indexOfLastPost) ?? [];

  const canGoNext =
    currentPage >= 1 && currentPosts && currentPosts.length >= postsPerPage;
  // ;
  // ;

  const canGoBack = currentPage >= 2;

  if (loading) {
    <div>Loading...</div>;
  }

  if (!location && !locationResidents && !loading) {
    return (
      <div>
        <img className="poopy" src={poopy} alt="Mr poopy butthole" />
        <h1 style={{ fontFamily: "wubba", color: "yellowgreen" }}>
          Nothing to see here...
        </h1>
      </div>
    );
  }

  return (
    <section className="residents">
      {location?.name && <h1>{location.name}</h1>}
      <div className="resident-list">
        {currentPosts?.map(function (r) {
          return (
            <Link to={`/characters/${r.id}`} key={r.id}>
              <CharacterCard character={r} />
            </Link>
          );
        })}
      </div>
      <div className="pagination-buttons">
        <button
          disabled={!canGoBack}
          onClick={() => dispatch({ type: "decrement" })}
        >
          Previous
        </button>
        <button
          disabled={!canGoNext}
          onClick={() => dispatch({ type: "increment" })}
        >
          Next
        </button>
      </div>
      {locationResidents?.length < 1 && (
        <div className="empty">
          <img className="poopy" src={poopy} alt="Mr poopy butthole" />
          <h1>Nothing to see here...</h1>
        </div>
      )}
    </section>
  );
}
