import React, { useEffect, useRef, useState } from "react";
import play from "./playerAssests/play.png";
import pause from "./playerAssests/pause.png";
import volume from "./playerAssests/volume.png";
import ff from "./playerAssests/fast_forward.png";
import fr from "./playerAssests/fast_rewind.png";
const YouTubeController = ({ videoId }) => {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [volume, setVolume] = useState(100);
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      document.body.appendChild(tag);
      tag.onload = () => {
        window.onYouTubeIframeAPIReady = initializePlayer;
      };
    } else {
      initializePlayer();
    }

    function initializePlayer() {
      if (playerRef.current) return;

      const newPlayer = new YT.Player("ytplayer", {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          controls: 1,
        },
        events: {
          onReady: (event) => {
            setPlayer(newPlayer);
            setDuration(newPlayer.getDuration());
            newPlayer.setVolume(volume);
          },
          onStateChange: (event) => {
            console.log("State changed:", event.data);
          },
        },
      });

      playerRef.current = newPlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  useEffect(() => {
    // Update current time every second if the player is ready
    const updateTime = setInterval(() => {
      if (player && !isSeeking) {
        setCurrentTime(player.getCurrentTime());
      }
    }, 1000);

    return () => {
      clearInterval(updateTime);
    };
  }, [player, isSeeking]);

  const handlePlay = () => {
    if (player) {
      player.playVideo();
    }
  };

  const handlePause = () => {
    if (player) {
      player.pauseVideo();
    }
  };

  const handleSkip = () => {
    if (player) {
      const currentTime = player.getCurrentTime();
      player.seekTo(currentTime + 10, true); // Skip 10 seconds
    }
  };
  const handleReverse = () => {
    if (player) {
      const currentTime = player.getCurrentTime();
      player.seekTo(currentTime - 10, true); // Skip 10 seconds
    }
  };

  const handleSeekChange = (e) => {
    const seekTo = e.target.value;
    if (player) {
      setIsSeeking(true); // Start seeking
      player.seekTo(seekTo, true); // Seek to the desired time
    }
  };

  const handleSeekMouseUp = () => {
    setIsSeeking(false); // Stop seeking
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (player) {
      player.setVolume(newVolume);
    }
  };

  return (
    <div>
      <div id="ytplayer" className="h-0 fixed left-0 w-0 bottom-0"></div>

      <div className="controls fixed left-0 bottom-0 text-white p-3 flex bg-neutral-700 w-full items-center justify-between">
        <div className="details"></div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex">
            <button
              onClick={handleReverse}
              className=" px-4 py-2 rounded-md w-20"
            >
              <img src={fr} alt="" />
            </button>
            <button onClick={handlePlay} className=" px-4 py-2 rounded-md w-20">
              <img src={play} alt="" />
            </button>
            <button
              onClick={handlePause}
              className=" px-4 py-2 rounded-md w-20"
            >
              <img src={pause} alt="" />
            </button>
            <button onClick={handleSkip} className=" px-4 py-2 rounded-md w-20">
              <img src={ff} alt="" />
            </button>
          </div>
          <div className="mt-4">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
              className="w-[25vw]"
            />
            <div className="flex justify-between text-sm text-gray-300">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Volume control */}
        <div className="mt-4">
          <label className="block text-sm text-gray-300">
            <img src={volume} alt="" />
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

// Helper function to format time (seconds to MM:SS)
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

export default YouTubeController;
