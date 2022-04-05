import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async ({ queryKey }) => {
  const [key, page] = queryKey;
  console.log(key, page);
  try {
    const res = await fetch(`https://swapi.dev/api/${key}/?page=${page}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const query = ["planets", page];
  const { data, status } = useQuery(query, fetchPlanets);

  // const Planets = () => {
  //   const [page, setPage] = useState(1);
  //   const { data, status } = useQuery(["planets", page], () =>
  //     fetchPlanets(page)
  //   );

  return (
    <div>
      <h2>Planets</h2>

      {status === "loading" && (
        <div class="spinner">
          <div class="dot1"></div>
          <div class="dot2"></div>
          <div class="dot3"></div>
        </div>
      )}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <>
          <button
            onClick={() => setPage((oldValue) => Math.max(oldValue - 1, 1))}
            disabled={page === 1}
          >
            Previous page
          </button>
          <span className="badge bg-warning text-dark m-2">{page}</span>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              setPage((oldValue) =>
                !data || !data.next ? oldValue : oldValue + 1
              )
            }
            disabled={!data || !data.next}
          >
            Next page
          </button>
          <div>
            {data.results.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(Planets);
