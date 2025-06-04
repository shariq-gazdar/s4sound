import React, { useState, useEffect, useContext } from "react";
import Nav from "./Nav";
import CardsContainer from "./CardsContainer";
import { auth } from "../config/firebase";
import dbContext from "../context/DbContext";
import mediaContext from "../context/MediaContext";
import Suggestions from "../components/Suggestions";

function Mainpage({ setUser, setCount }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exist, setExist] = useState(false);
  const [error, setError] = useState(null);
  const [invisible, setInvisible] = useState(true);
  const [suggest, setSuggest] = useState([]);
  const [bgImage, setBgImage] = useState(""); // Fixed: Added state for background image
  const { info, videoId } = useContext(mediaContext);

  useEffect(() => {
    // Find the current video info and set background image
    const currentVideoInfo = info.find((i) => i.id === videoId);
    if (currentVideoInfo) {
      setBgImage(currentVideoInfo.thumbnail);
    }
  }, [videoId, info]); // Added proper dependencies

  return (
    <div className="bg-neutral-900/5 w-full lg:w-3/4 h-screen p-5 rounded-l-3xl ">
      {/* {!invisible ? (
        <div className="absolute  top-2 opacity-50 blur-sm  shadow-white">
          <img src={bgImage} alt="" className="w-[60vw] h-[50vh]" />
        </div>
      ) : null} */}

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
        setSuggest={setSuggest}
      />

      {error && <div className="text-red-500 text-center">{error}</div>}
      {invisible ? (
        <CardsContainer searchTerm={searchTerm} result={result} />
      ) : (
        <div className="text-white ml-10">Search for your favorite songsC</div>
      )}
      {suggest.length && searchTerm.length ? (
        <Suggestions suggest={suggest} />
      ) : (
        <div className="text-white ml-5">Search for your favorite songsS</div>
      )}
    </div>
  );
}

export default Mainpage;
