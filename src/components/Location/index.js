import axios from "axios";
import { useEffect, useState } from "react";

export default function Location({ location }) {
  const [residents, setResidents] = useState(null);

  useEffect(
    function () {
      // function that gets all residents
      async function getResidents() {
        try {
          //
          const promiseArray = location?.residents?.map(async (i) => {
            return axios.get(`${i}/?status=alive`);
          });
          const response = await Promise.all(promiseArray);
          const residents = response
            .map((character) => character.data)
            .filter(
              (character) => character?.status?.toLowerCase() === "alive"
            );
          setResidents(residents);
        } catch (e) {}
      }

      if (location) {
        getResidents();
      }
    },
    [location]
  );

  // ;

  return (
    <div>
      {location?.name && <h2>{location.name}</h2>}
      <ul className="residents">
        {residents?.map((resident) => {
          return <li key={JSON.stringify(resident)}>{resident.name}</li>;
        })}
      </ul>
    </div>
  );
}
