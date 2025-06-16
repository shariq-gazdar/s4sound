import React, { useState, useEffect, useContext } from "react";
import Nav from "./Nav";
import CardsContainer from "./CardsContainer";
import Suggestions from "../components/Suggestions";
import mediaContext from "../context/MediaContext";

function Search({ setUser, setCount }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [invisible, setInvisible] = useState(true);
  const [suggest, setSuggest] = useState([]);
  const [bgImage, setBgImage] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const { info, videoId } = useContext(mediaContext);

  // Update background image whenever videoId or info changes
  useEffect(() => {
    const currentVideoInfo = info.find((i) => i.id === videoId);
    if (currentVideoInfo) setBgImage(currentVideoInfo.thumbnail);
  }, [videoId, info]);

  return (
    <div className="bg-neutral-900 w-full lg:w-[115%] h-screen p-5 rounded-l-3xl relative overflow-hidden">
      {/* Optional: Ambient background image */}
      {/* Uncomment if you want the ambient image effect */}
      {bgImage && (
        <img
          src={bgImage}
          alt="Ambient background"
          className="absolute top-0 left-0 w-full h-full object-cover blur-2xl opacity-30 scale-110 z-[-1]"
        />
      )}

      {/* Navigation bar */}
      <Nav
        setSearchTerm={setSearchTerm}
        setUser={setUser}
        setResult={setResult}
        setError={setError}
        searchTerm={searchTerm}
        setCount={setCount}
        setInvisible={setInvisible}
        invisible={invisible}
        setSuggest={setSuggest}
        setShowSuggestions={setShowSuggestions}
      />

      {/* Error message */}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Search results or message */}
      {invisible ? (
        <CardsContainer searchTerm={searchTerm} result={result} />
      ) : (
        <div className="text-white ml-10">Search for your favorite songs</div>
      )}

      {showSuggestions &&
        (suggest.length > 0 ? (
          <Suggestions
            suggest={suggest}
            setSearchTerm={setSearchTerm}
            setShowSuggestions={setShowSuggestions}
          />
        ) : (
          searchTerm && (
            <div className="text-white ml-5">
              No suggestions found for "{searchTerm}"
            </div>
          )
        ))}
    </div>
  );
}

export default Search;
