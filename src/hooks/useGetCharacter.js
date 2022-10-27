import { useEffect, useState } from "react";
import axios from "axios";
import { useCallback } from "react";

export default function useGetCharacter(id) {
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);

  const getCharacter = useCallback(async (id) => {
    setError(null);

    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      const fetchedCharacter = response.data;

      if (!fetchedCharacter) {
        throw new Error("No such character exists");
      } else {
        setCharacter(fetchedCharacter);
      }
    } catch (error) {
      if (error?.message) {
        setError(error.message);
      }
    }
  }, []);

  useEffect(() => {
    if (!character && !!id) {
      getCharacter(id);
    }
  }, [character, id, getCharacter]);

  return { character, error, loading: !character && !error };
}
