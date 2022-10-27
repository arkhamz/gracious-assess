import { useState, useEffect } from "react";
import axios from "axios";
import { useCallback } from "react";

export default function useGetEpisodeCharacters(id) {
  const [episode, setEpisode] = useState(null);
  const [error, setError] = useState(null);

  const getEpisodeCharacters = useCallback(async (id) => {
    setError(null);
    try {
      // get episode
      const response = await axios.get(
        `https://rickandmortyapi.com/api/episode/${id}`
      );
      const fetchedEpisode = response?.data;

      if (!fetchedEpisode) {
        throw new Error("Episode not found");
      }

      // get episode's characters
      const promiseArray =
        fetchedEpisode?.characters?.map((url) => {
          return axios.get(url);
        }) ?? [];

      const characterResponse = await Promise.all(promiseArray);

      if (!characterResponse) {
        throw new Error("Characters could not be fetched");
      }
      const characters = characterResponse
        ?.filter((character) => !!character?.data)
        ?.map((character) => character.data);

      setEpisode({ ...fetchedEpisode, characters: characters });
    } catch (error) {
      setError(error.message);
    }
  }, []);

  //Get episode when id changes
  useEffect(() => {
    if (!episode && !!id) {
      getEpisodeCharacters(id);
    }
  }, [id, getEpisodeCharacters, episode]);

  return { episode, error, loading: !episode && !error };
}
