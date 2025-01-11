import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import CardsContainer from "./CardsContainer";
import YouTubeController from "./YtAudioPlayer";

function Mainpage({ setUser, setCount }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const [videoId, setVideoId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allIds, setAllIds] = useState([]);
  const [info, setInfo] = useState([]);
  // useEffect(() => {
  //   if (info) {
  //     console.log(info);
  //   } else {
  //     console.log("Info is null");
  //   }
  // }, [info]);
  // console.log(allIds);

  return (
    <div className="bg-neutral-900 w-3/4 h-screen p-5 rounded-l-3xl">
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
        <CardsContainer
          searchTerm={searchTerm}
          result={result}
          setAllIds={setAllIds}
          setVideoId={setVideoId}
          setInfo={setInfo}
          info={info}
        />
      )}

      {videoId && (
        <YouTubeController
          videoId={videoId}
          allIds={allIds}
          setVideoId={setVideoId}
          info={info}
        />
      )}
    </div>
  );
}

export default Mainpage;
