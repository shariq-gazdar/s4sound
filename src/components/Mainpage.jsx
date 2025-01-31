import React, { useState, useEffect, useContext } from "react";
import { getDocs, doc, collection } from "firebase/firestore";
import Nav from "./Nav";
import CardsContainer from "./CardsContainer";
import YouTubeController from "./YtAudioPlayer";
import { auth, db } from "../config/firebase";
import MediaContext from "../context/MediaContext";
import { div } from "framer-motion/client";
function Mainpage({ setUser, setCount }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
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
      ) : null}
    </div>
  );
}

export default Mainpage;
