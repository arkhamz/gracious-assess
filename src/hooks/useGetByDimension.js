import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function useGetByDimension(currentQuery) {
  const [query, setQuery] = useState(currentQuery);
  const [dimension, setDimension] = useState(null);
  const [error, setError] = useState(null);

  const getByDimension = useCallback(async () => {
    setError(null);
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/location/?dimension=${query}`
      );
      const fetchedLocations = response?.data?.results;

      if (!fetchedLocations) {
        throw new Error("No locations exist");
      } else {
        setDimension(fetchedLocations);
      }
    } catch (e) {
      setError(e.message);
    }
  }, [query]);

  useEffect(() => {
    if (currentQuery !== query) {
      setDimension(null);
      setQuery(currentQuery);
      getByDimension();
    }
  }, [currentQuery, query, getByDimension]);

  useEffect(() => {
    if (!dimension && !!currentQuery) {
      getByDimension();
    }
  }, [currentQuery, dimension, getByDimension, query]);

  return { dimension, error, getByDimension, loading: !dimension && !error };
}
