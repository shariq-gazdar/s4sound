import React, { useState, useEffect, useContext } from "react";
import { getDocs, doc, collection } from "firebase/firestore";
import Nav from "./Nav";
import CardsContainer from "./CardsContainer";
import YouTubeController from "./YtAudioPlayer";
import { auth, db } from "../config/firebase";
import MediaContext from "../context/MediaContext";
function Mainpage({ setUser, setCount }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
      />

      {error && <div className="text-red-500 text-center">{error}</div>}
      {loading ? (
        <div className="text-white text-center">Loading...</div>
      ) : (
        <CardsContainer searchTerm={searchTerm} result={result} />
      )}
    </div>
  );
}

export default Mainpage;
