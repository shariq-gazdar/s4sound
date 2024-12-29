import React, { useState } from "react";
import Nav from "./Mainpage/Nav";
import CardsContainer from "./CardsContainer";
import YtAudioPlayer from "./Mainpage/YtAudioPlayer";

function Mainpage({ setUser }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(videoId);

  return (
    <div className="bg-neutral-900 w-3/4 h-screen p-5">
      <Nav
        setSearchTerm={setSearchTerm}
        setUser={setUser}
        setResult={setResult}
        setLoading={setLoading}
        setError={setError}
        searchTerm={searchTerm}
      />

      {error && <div className="text-red-500 text-center">{error}</div>}
      {loading ? (
        <div className="text-white text-center">Loading...</div>
      ) : (
        <CardsContainer
          searchTerm={searchTerm}
          result={result}
          setVideoId={setVideoId}
        />
      )}

      {videoId && <YtAudioPlayer videoId={videoId} />}
    </div>
  );
}

export default Mainpage;
