import { Link } from "react-router-dom";
import useGetEpisodes from "../../hooks/useGetEpisodes";
import usePageReducer from "../../hooks/usePageReducer";
import "./Episodes.css";

export default function Episodes() {
  const [{ currentPage }, dispatch] = usePageReducer();
  const { episodes, maxPages, loading } = useGetEpisodes(currentPage);

  if (loading) {
    <div>Loading...</div>;
  }

  if (!episodes) {
    return <div>Something went wrong...</div>;
  }

  return (
    <section className="episodes">
      <ul className="episode-list">
        {episodes?.map((episode) => {
          return (
            <Link
              to={`/episodes/${episode.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
              key={JSON.stringify(episode)}
            >
              <article className="episode-prev">
                {episode?.name && <h4>{episode.name}</h4>}
                {episode?.episode && <p>{episode.episode}</p>}
              </article>
            </Link>
          );
        })}
      </ul>
      <div className="pagination-buttons">
        <button
          disabled={currentPage <= 1}
          onClick={() => dispatch({ type: "decrement" })}
        >
          Previous
        </button>
        <button
          disabled={currentPage >= maxPages}
          onClick={() => dispatch({ type: "increment" })}
        >
          Next
        </button>
      </div>
    </section>
  );
}
