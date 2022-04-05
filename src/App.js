import { useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import Image from "./images/planet.png";
import "./App.css";

import Navbar from "./components/Navbar";
import People from "./components/People";
import Planets from "./components/Planets";

function App() {
  const [page, setPage] = useState("planets");
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <img src={Image} id="background-image" alt="" />
      <h1>Star Wars Info</h1>
      <Navbar setPage={setPage} />
      <div className="content">
        <QueryClientProvider client={queryClient}>
          {page === "planets" ? <Planets /> : <People />}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
