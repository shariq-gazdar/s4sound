import React, { useState, useEffect, useContext } from "react";
import Nav from "./Nav";
import CardsContainer from "./CardsContainer";
import { auth } from "../config/firebase";
import dbContext from "../context/DbContext";

function Mainpage({ setUser, setCount }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exist, setExist] = useState(false);
  const [error, setError] = useState(null);
  const [invisible, setInvisible] = useState(true);

  return (
    <div className="bg-neutral-900/5 w-full lg:w-3/4 h-screen p-5 rounded-l-3xl">
      <Nav
        setSearchTerm={setSearchTerm}
        setUser={setUser}
        setResult={setResult}
        setLoading={setLoading}
        setError={setError}
        searchTerm={searchTerm}
        setCount={setCount}
        setInvisible={setInvisible}
        invisible={invisible}
      />

      {error && <div className="text-red-500 text-center">{error}</div>}
      {invisible ? (
        <CardsContainer searchTerm={searchTerm} result={result} />
      ) : (
        <div className="text-white ml-10">Search for your favorite songs</div>
      )}
    </div>
  );
}

export default Mainpage;
