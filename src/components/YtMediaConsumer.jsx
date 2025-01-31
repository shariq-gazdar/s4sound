import React, { useEffect, useContext } from "react";
import MediaContext from "../context/MediaContext";
import YtAudioPlayer from "./YtAudioPlayer";
function YtMediaConsumer() {
  const { videoId } = useContext(MediaContext);
  useEffect(() => {
    console.log("working");
  });
  return <div>{videoId && <YtAudioPlayer />}</div>;
}

export default YtMediaConsumer;
