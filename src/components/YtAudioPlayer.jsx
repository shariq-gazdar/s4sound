import { useEffect, useState, useRef, useContext } from "react";
import play from "./playerAssests/play.png";
import pause from "./playerAssests/pause.png";
import volumeIcon from "./playerAssests/volume.png";
import volumeMute from "./playerAssests/volume_off.png";
import ff from "./playerAssests/fast_forward.png";
import fr from "./playerAssests/fast_rewind.png";
import pt from "./playerAssests/prev_track.png";
import nt from "./playerAssests/next_track.png";
import MediaContext from "../context/MediaContext";
import blackFav from "./playerAssests/blackHeart.svg";
import blackFill from "./playerAssests/blackHeartFill.svg";
import { color, motion } from "framer-motion";
import dbContext from "../context/DbContext";
import "./mainStyle.css";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import React from "react";
import { db, auth } from "../config/firebase";
import upArrow from "./playerAssests/upArrow.svg";

const YouTubeController = () => {
  const { videoId, setVideoId, allIds, info } = useContext(MediaContext);
  const { dbData } = useContext(dbContext);
  const [favorites, setFavorites] = useState({}); // Add this at the top with other states
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(5);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [previousVol, setPreviousVol] = useState(50);
  const [mute, setMute] = useState(false);
  const [title, setTitle] = useState("");
  const [dominantColor, setDominantColor] = useState(null);
  const [channelName, setChannelName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [fav, setFav] = useState(() => {
    return dbData?.favorites?.some((item) => item.videoId === videoId) || false;
  });
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      document.body.appendChild(tag);

      tag.onload = () => {
        window.onYouTubeIframeAPIReady = initializePlayer;
      };

      tag.onerror = () => {
        console.error("Failed to load YouTube IFrame API");
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
    if (dbData?.favorites) {
      const isFav = dbData.favorites.some((item) => item.videoId === videoId);
      setFav(isFav);
    }
  }, [videoId, dbData]);

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
  useEffect(() => {
    if (!videoId && playerRef.current) {
      playerRef.current.destroy();
      setPlayer(null); // Optionally reset player state
    }
  }, [videoId]);

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
  const handleReversePlay = () => {
    if (!allIds || allIds.length === 0) {
      console.error("No video IDs available for autoplay.");
      return;
    }

    const currentIndex = allIds.indexOf(videoId);
    if (currentIndex === -1) {
      console.error("Current videoId not found in allIds.");
      return;
    }

    const nextIndex = (currentIndex - 1) % allIds.length;
    if (nextIndex < 0) {
      const nextVideoId = allIds[allIds.length - 1];
      setVideoId(nextVideoId);
    } else {
      const nextVideoId = allIds[nextIndex];
      setVideoId(nextVideoId);
    }
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
      case "k":
        if (isPlaying) handlePause();
        else handlePlay();
        break;
      case "ArrowRight":
      case "l":
        handleSkip();
        break;
      case "ArrowLeft":
      case "j":
        handleReverse();
        break;
      case "m":
        handleMute();
        break;
      case "f":
        handleFav();
        break;
      default:
        break;
    }
  };

  const handleFav = async () => {
    if (!auth.currentUser) {
      console.error("User not authenticated");
      return;
    }
    const userDoc = doc(db, "users", auth.currentUser.email.split("@")[0]);
    const favData = { videoId, title, channelName, thumbnail };
    try {
      if (fav) {
        await updateDoc(userDoc, {
          favorites: arrayRemove(favData),
        });
      } else {
        await updateDoc(userDoc, {
          favorites: arrayUnion(favData),
        });
      }
      setFav(!fav);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };
  const getDominantColor = (imageUrl, callback) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.src = imageUrl;

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions to image size
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image on canvas
      ctx.drawImage(img, 0, 0);

      // Get pixel data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Color frequency counter
      const colorCounts = {};
      let maxCount = 0;
      let dominantColor = "";

      // Iterate through pixels
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        if (a < 255) continue;
        const colorKey = `${r},${g},${b}`;

        colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;

        if (colorCounts[colorKey] > maxCount) {
          maxCount = colorCounts[colorKey];
          dominantColor = colorKey;
        }
      }

      // Convert to hex format
      const [red, green, blue] = dominantColor.split(",").map(Number);
      const hexColor = `#${red.toString(16).padStart(2, "0")}${green
        .toString(16)
        .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;

      callback(hexColor);
    };

    img.onerror = function () {
      console.error("Error loading image");
      callback(null); // Handle error in callback
    };
  };
  useEffect(() => {
    if (thumbnail) {
      getDominantColor(thumbnail, (color) => {
        setDominantColor(color);
        console.log("Dominant Color:", color); // Log correctly
      });
    }
    console.log(dominantColor);
  }, [videoId]); // Depend only on `thumbnail`

  return (
    <div>
      <div id="ytplayer" className="h-0 fixed left-0 w-0 bottom-0"></div>
      {videoId && (
        <>
          <motion.div
            className="controls fixed left-0 bottom-0 text-white px-20 py-10  w-full items-center justify-between rounded-t-2xl h-36 mb-14 hidden lg:flex lg:mb-0"
            style={{ backgroundColor: dominantColor || "#15803d" }} // Default fallback
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.25 }}
            onKeyDown={handleShortcuts}
          >
            {/* Info stuff */}
            <div className="info hidden lg:flex w-64 h-20 gap-x-3">
              <img src={thumbnail} alt="Thumbnail" className="rounded-lg" />
              <div>
                <marquee className="font-bold w-fit  h-5 " direction="right">
                  {title}
                </marquee>
                <p>{channelName}</p>
              </div>
            </div>
            {/* duration stuff */}
            <div className="flex flex-col items-center justify-center gap-y-3">
              <div className="flex justify-center items-center gap-x-3 ">
                <div>{formatTime(currentTime)}</div>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleSeekChange}
                  onMouseUp={handleSeekMouseUp}
                  className="w-[20vw]"
                />

                <div>{formatTime(duration)}</div>
              </div>
              {/* Media controls */}
              <div className="flex">
                <button
                  onClick={handleReversePlay}
                  className="-ml-3 px-2 rounded-md w-16"
                >
                  <img src={pt} alt="Previous Track" />
                </button>
                <button
                  onClick={handleReverse}
                  className="px-4 rounded-md w-16"
                >
                  <img src={fr} alt="Rewind" />
                </button>

                <button
                  onClick={isPlaying ? handlePause : handlePlay}
                  className="px-4 rounded-md w-20"
                >
                  <img
                    src={isPlaying ? pause : play}
                    alt={isPlaying ? "pause" : "play"}
                  />
                </button>

                <button onClick={handleSkip} className="px-4 rounded-md w-16">
                  <img src={ff} alt="Fast Forward" />
                </button>
                <button
                  onClick={handleAutoPlay}
                  className="-ml-3 px-2 rounded-md w-16"
                >
                  <img src={nt} alt="Next Track" />
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
              <div>
                <img
                  src={!fav ? blackFill : blackFav}
                  alt={!fav ? "Remove from favorites" : "Add to favorites"}
                  className="w-10 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFav();
                  }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div className="fixed left-0 bottom-14 w-full h-24 bg-green-800 text-center items-center justify-between flex overflow-hidden px-10 gap-x-2 lg:hidden">
            <button>
              <img
                src={upArrow}
                alt=""
                className="w-5 absolute top-0 left-[50%]"
              />
            </button>
            <div className="flex  text-white -ml-14">
              <img src={thumbnail} alt="" className="w-20" />
              <div className="flex flex-col justify-start">
                <marquee
                  className="w-40 ml-2"
                  direction="right"
                  behavior="continue"
                >
                  {title}
                </marquee>
                <h1 className="text-left pl-2">{channelName}</h1>
              </div>
            </div>
            <div>
              <button
                onClick={isPlaying ? handlePause : handlePlay}
                className="px-4 rounded-md w-20"
              >
                <img
                  src={isPlaying ? pause : play}
                  alt={isPlaying ? "pause" : "play"}
                />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default YouTubeController;
