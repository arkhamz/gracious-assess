import { useParams } from "react-router-dom";
import useGetCharacter from "../../hooks/useGetCharacter";
import "./Character.css";

export default function Character() {
  const { id } = useParams();
  const { character, loading } = useGetCharacter(id);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <article className="character-container">
      {character?.image && (
        <div className="character-profile">
          <img src={character.image} alt="character profile" />
        </div>
      )}
      <div className="character-content">
        {character?.name && <h2 className="char-name"> {character.name}</h2>}
        {character?.status && (
          <p>
            Status: <span>{character.status}</span>
          </p>
        )}
        {character?.species && (
          <p>
            Species: <span>{character.species}</span>
          </p>
        )}
        {character?.gender && (
          <p>
            Gender: <span>{character.gender}</span>
          </p>
        )}
        {character?.origin?.name && (
          <p>
            Origin: <span>{character.origin.name}</span>
          </p>
        )}
        {character?.location?.name && (
          <p>
            Last seen: <span>{character.location.name}</span>
          </p>
        )}
      </div>
    </article>
  );
}
