import React from "react";
import { useQuery } from "react-query";
import Person from "./Person";

const fetchPeople = async () => {
  const res = await fetch("https://www.swapi.tech/api/people/");
  const data = await res.json();
  return data;
};

const People = () => {
  const { data, status } = useQuery("people", fetchPeople, {
    cacheTime: 0,
    staleTime: 0,
  });

  return (
    <div>
      <h2>People</h2>

      {status === "loading" && (
        <div class="spinner">
          <div class="dot1"></div>
          <div class="dot2"></div>
          <div class="dot3"></div>
        </div>
      )}

      {status === "error" && <div>Error fetching data</div>}

      {status === "success" && (
        <div>
          {data.results.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(People);
