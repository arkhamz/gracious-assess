import "./CharacterCard.css";

export default function CharacterCard({ character }) {
  if (!character) {
    return null;
  }

  const name = character?.name;
  const status = character?.status;
  const image = character?.image;

  return (
    <article className="char-container">
      {!!image && (
        <div className="top">
          <img src={image} alt="character card" />
        </div>
      )}
      <div className="bottom">
        {name && (
          <p
            style={{ color: "black", fontFamily: "wubba" }}
            className="char-name"
          >
            {name}
          </p>
        )}
        {status && <p>{status}</p>}
      </div>
    </article>
  );
}
