import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useLocationResidents(id) {
  const [location, setLocation] = useState(null);
  const [locationResidents, setLocationResidents] = useState(null);
  const [error, setError] = useState(null);

  const getLocationWithResidents = useCallback(async () => {
    try {
      // get location
      const locationResponse = await axios.get(
        `https://rickandmortyapi.com/api/location/${id}`
      );
      setLocation(locationResponse.data);
      // get residents
      const locationResidents = locationResponse.data.residents;
      // get residents all at once
      const promiseArray = locationResidents.map(function (i) {
        return axios.get(`${i}/?status=alive`);
      });
      const residentResponse = await Promise.all(promiseArray);
      const modified = residentResponse.map((character) => character.data);
      const alive = modified.filter(
        (char) => "alive" === char.status.toLowerCase()
      );
      setLocationResidents(alive);
    } catch (error) {
      setError(error.message);
    }
  }, [id]);

  useEffect(() => {
    if (!locationResidents && !!id) {
      // function that gets all residents
      getLocationWithResidents();
    }
  }, [locationResidents, getLocationWithResidents, id]);

  return { locationResidents, location, loading: !location && !error, error };
}
