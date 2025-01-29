import { useEffect, useState, useRef } from "react";
import play from "./playerAssests/play.png";
import pause from "./playerAssests/pause.png";
import volumeIcon from "./playerAssests/volume.png";
import volumeMute from "./playerAssests/volume_off.png";
import ff from "./playerAssests/fast_forward.png";
import fr from "./playerAssests/fast_rewind.png";
import { motion } from "framer-motion";
import "./mainStyle.css";

const YouTubeController = ({ videoId, setVideoId, allIds, info }) => {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [previousVol, setPreviousVol] = useState(50);
  const [mute, setMute] = useState(false);
  const [title, setTitle] = useState("");
  const [channelName, setChannelName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const { fav, setFav } = useState(false);
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
      if (playerRef.current) playerRef.current.destroy();
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
          onStateChange: handleStateChange,
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
  }, [videoId]);

  useEffect(() => {
    const updateTime = setInterval(() => {
      if (player && !isSeeking) {
        setCurrentTime(player.getCurrentTime());
      }
    }, 1000);

    return () => clearInterval(updateTime);
  }, [player, isSeeking]);

  const handleStateChange = (event) => {
    if (event.data === YT.PlayerState.ENDED) {
      handleAutoPlay();
    }
  };

  const handlePlay = () => {
    if (player) {
      player.playVideo();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (player) {
      player.pauseVideo();
      setIsPlaying(false);
    }
  };

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

  const handleMute = () => {
    if (player) {
      if (!mute) {
        setPreviousVol(volume);
        player.setVolume(0);
        setVolume(0);
      } else {
        player.setVolume(previousVol);
        setVolume(previousVol);
      }
    }
    setMute(!mute);
  };

  const handleAutoPlay = () => {
    if (!allIds || allIds.length === 0) {
      console.error("No video IDs available for autoplay.");
      return;
    }

    const currentIndex = allIds.indexOf(videoId);
    if (currentIndex === -1) {
      console.error("Current videoId not found in allIds.");
      return;
    }

    const nextIndex = (currentIndex + 1) % allIds.length;
    const nextVideoId = allIds[nextIndex];

    setVideoId(nextVideoId);
  };

  const handleInfo = (info) => {
    const videoInfo = info.find((i) => i.id === videoId);
    if (videoInfo) {
      setChannelName(videoInfo.channelTitle);
      setThumbnail(videoInfo.thumbnail);
      setTitle(videoInfo.title);
    }
  };

  useEffect(() => {
    handleInfo(info);
  }, [videoId, info]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
  const handleShortcuts = (e) => {
    switch (e.key) {
      case "k": {
        if (isPlaying) {
          handlePause();
        } else {
          handlePlay();
        }
        break;
      }
      case "ArrowRight":
      case "l": {
        handleSkip();
        break;
      }
      case "ArrowLeft":
      case "j": {
        handleReverse();
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <div>
      <div id="ytplayer" className="h-0 fixed left-0 w-0 bottom-0"></div>

      <motion.div
        className="controls fixed left-0 bottom-0 text-white p-3 flex bg-green-700 w-full items-center justify-between rounded-t-2xl h-36 mb-14 lg:mb-0 "
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.25 }}
        onKeyDown={handleShortcuts}
      >
        {/* Info stuff */}
        <div className="info hidden lg:flex w-64 h-20 gap-x-3">
          <img src={thumbnail} alt="Thumbnail" />
          <div>
            <marquee className="font-bold w-fit  h-5 " direction="right">
              {title}
            </marquee>
            <p>{channelName}</p>
          </div>
        </div>
        {/* duration stuff */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex justify-center items-center gap-x-3">
            <div>{formatTime(currentTime)}</div>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
              className="w-[25vw]"
            />

            <div>{formatTime(duration)}</div>
          </div>
          <div className="flex">
            <button onClick={handleReverse} className="px-4 rounded-md w-20">
              <img src={fr} alt="Rewind" />
            </button>
            {isPlaying ? (
              <button onClick={handlePause} className="px-4 rounded-md w-20">
                <img src={pause} alt="Pause" />
              </button>
            ) : (
              <button onClick={handlePlay} className="px-4 rounded-md w-20">
                <img src={play} alt="Play" />
              </button>
            )}
            <button onClick={handleSkip} className="px-4 rounded-md w-20">
              <img src={ff} alt="Fast Forward" />
            </button>
          </div>
        </div>
        {/* volume controls */}
        <div className="mt-4 flex justify-center items-center w-72 gap-x-3">
          <label className="block text-sm text-gray-300">
            <img
              src={mute ? volumeMute : volumeIcon}
              alt="Volume"
              className="w-10"
              onClick={handleMute}
            />
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-40"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default YouTubeController;
