import React, { useState } from "react";
import MediaContext from "./MediaContext";
const MediaContextProvider = ({ children }) => {
  const [videoId, setVideoId] = useState("");
  const [allIds, setAllIds] = useState([]);
  const [info, setInfo] = useState([]);

  return (
    <MediaContext.Provider
      value={{ videoId, setVideoId, allIds, setAllIds, info, setInfo }}
    >
      {children}
    </MediaContext.Provider>
  );
};
export default MediaContextProvider;
