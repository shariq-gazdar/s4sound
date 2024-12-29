import React, { useState, useEffect, useRef } from "react";

const YouTubeAudioPlayer = ({ videoId }) => {
  const [playerReady, setPlayerReady] = useState(false); // Track if player is ready
  const playerRef = useRef(null);

  useEffect(() => {
    // Load YouTube Iframe API script
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.body.appendChild(script);

    // Once the API is ready, initialize the player
    window.onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };

    const initializePlayer = () => {
      playerRef.current = new YT.Player("youtube-player", {
        height: "0", // Hide video
        width: "0",
        videoId: videoId,
        playerVars: {
          autoplay: 0, // Do not autoplay
          controls: 0, // Hide controls
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          src: `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1`,
        },
        events: {
          onReady: () => {
            console.log("Player is ready");
            setPlayerReady(true); // Set player to ready state when onReady event is fired
          },
        },
      });
    };

    // Cleanup function to remove the script and destroy the player
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      document.body.removeChild(script);
    };
  }, [videoId]);

  // Play audio
  const playAudio = () => {
    if (playerReady && playerRef.current) {
      playerRef.current.playVideo();
    } else {
      console.log("Player is not initialized yet");
    }
  };

  // Pause audio
  const pauseAudio = () => {
    if (playerReady && playerRef.current) {
      playerRef.current.pauseVideo();
    }
  };

  return (
    <div>
      <div id="youtube-player" style={{ display: "none" }}></div>{" "}
      {/* Hidden iframe */}
      <div className="controls">
        <button onClick={playAudio} disabled={!playerReady}>
          Play
        </button>
        <button onClick={pauseAudio} disabled={!playerReady}>
          Pause
        </button>
      </div>
    </div>
  );
};

export default YouTubeAudioPlayer;
