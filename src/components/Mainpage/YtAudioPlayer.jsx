import React, { useEffect, useRef, useState } from "react";
import play from "./playerAssests/play.png";
import pause from "./playerAssests/pause.png";
import volumeIcon from "./playerAssests/volume.png";
import ff from "./playerAssests/fast_forward.png";
import fr from "./playerAssests/fast_rewind.png";

const YouTubeController = ({ videoId }) => {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isSeeking, setIsSeeking] = useState(false);

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
      if (playerRef.current) playerRef.current.destroy(); // Destroy existing player

      const newPlayer = new YT.Player("ytplayer", {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          controls: 1,
        },
        events: {
          onReady: () => {
            setPlayer(newPlayer);
            setDuration(newPlayer.getDuration());
            newPlayer.setVolume(volume);
          },
          onStateChange: (event) => {
            console.log("State changed:", event.data);
          },
          onError: (event) => {
            console.error("Player error:", event.data);
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
  }, [videoId]); // Reinitialize when videoId changes

  useEffect(() => {
    const updateTime = setInterval(() => {
      if (player && !isSeeking) {
        setCurrentTime(player.getCurrentTime());
      }
    }, 1000);

    return () => clearInterval(updateTime);
  }, [player, isSeeking]);

  const handlePlay = () => player && player.playVideo();
  const handlePause = () => player && player.pauseVideo();
  const handleSkip = () =>
    player && player.seekTo(player.getCurrentTime() + 10, true);
  const handleReverse = () =>
    player && player.seekTo(player.getCurrentTime() - 10, true);

  const handleSeekChange = (e) => {
    const seekTo = Number(e.target.value);
    if (player) {
      setIsSeeking(true);
      player.seekTo(seekTo, true);
    }
  };

  const handleSeekMouseUp = () => setIsSeeking(false);

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    player && player.setVolume(newVolume);
  };

  return (
    <div>
      <div id="ytplayer" className="h-0 fixed left-0 w-0 bottom-0"></div>

      <div className="controls fixed left-0 bottom-0 text-white p-3 flex bg-neutral-700 w-full items-center justify-between">
        <div className="flex flex-col items-center justify-center">
          <div className="flex">
            <button
              onClick={handleReverse}
              className="px-4 py-2 rounded-md w-20"
            >
              <img src={fr} alt="Rewind" />
            </button>
            <button onClick={handlePlay} className="px-4 py-2 rounded-md w-20">
              <img src={play} alt="Play" />
            </button>
            <button onClick={handlePause} className="px-4 py-2 rounded-md w-20">
              <img src={pause} alt="Pause" />
            </button>
            <button onClick={handleSkip} className="px-4 py-2 rounded-md w-20">
              <img src={ff} alt="Fast Forward" />
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

        <div className="mt-4">
          <label className="block text-sm text-gray-300">
            <img src={volumeIcon} alt="Volume" />
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

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

export default YouTubeController;
