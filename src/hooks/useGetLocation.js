import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function useGetLocation(currentQuery) {
  const [query, setQuery] = useState(currentQuery);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = useCallback(async () => {
    setError(null);
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/location/?name=${query}`
      );
      const fetchedLocations = response?.data?.results;

      if (!fetchedLocations) {
        throw new Error("No locations exist");
      } else {
        setLocation(fetchedLocations);
        setError(null);
      }
    } catch (error) {
      if (error?.message) {
        setError(error.message);
      }
    }
  }, [query]);

  useEffect(() => {
    if (query !== currentQuery) {
      setLocation(null);
      setQuery(currentQuery);
      getLocation();
    }
  }, [query, getLocation, currentQuery]);

  useEffect(() => {
    if (!!query && !location) {
      getLocation();
    }
  }, [query, location, getLocation]);

  return { location, error, getLocation, loading: !location && !error };
}
