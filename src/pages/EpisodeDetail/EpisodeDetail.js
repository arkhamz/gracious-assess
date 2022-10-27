import { useParams, Link } from "react-router-dom";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import useGetEpisodeCharacters from "../../hooks/useGetEpisodeCharacters";
import "./EpisodeDetail.css";

// fetches episode along with characters
export default function EpisodeDetail() {
  const { id } = useParams();
  const { episode, loading } = useGetEpisodeCharacters(id);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="episode-detail">
      <div className="episode-info">
        {episode?.name && (
          <h1>
            {episode.name} {episode?.episode ? `(${episode.episode})` : ""}
          </h1>
        )}
        {episode?.air_date && <h3>{episode.air_date}</h3>}
      </div>

      <ul className="episode-characters">
        {episode?.characters?.map(function (character) {
          return (
            <Link
              key={JSON.stringify(character)}
              to={`/characters/${character.id}`}
              style={{ textDecoration: "none" }}
            >
              <CharacterCard character={character} />
            </Link>
          );
        })}
      </ul>
    </section>
  );
}
