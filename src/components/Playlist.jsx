import React, { useContext, useEffect } from "react";
import dbContext from "../context/DbContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import backArrow from "./playerAssests/backArrow.svg";
import { motion, AnimatePresence } from "framer-motion";
import mediaContext from "../context/MediaContext";

function Playlist() {
  const { dbData } = useContext(dbContext);
  const location = useLocation();
  const playlistName = decodeURI(location.pathname.split("/")[2]);
  const { setVideoId, setAllIds, setInfo } = useContext(mediaContext);
  const playlists = dbData?.playlists;
  const navigate = useNavigate();
  // Find the current playlist
  const currentPlaylist = playlists?.find(
    (playlist) => playlist.name === playlistName
  );

  // Handle card click
  const handleCardClick = (videoId) => {
    if (!currentPlaylist) return;

    setVideoId(videoId);
    setAllIds(currentPlaylist.songs.map((song) => song.videoId));

    const infoArr = currentPlaylist.songs.map((song) => ({
      id: song.videoId,
      title: song.title,
      thumbnail: song.thumbnail,
      channelTitle: song.channelTitle,
    }));

    setInfo(infoArr);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 200 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="h-screen flex text-white">
      <SideBar />
      <div className="flex-1 overflow-y-auto">
        <div className="flex justify-between items-center px-10 pt-10 font-bold text-4xl">
          <h1 className="">{playlistName}</h1>
          <motion.img
            src={backArrow}
            alt=""
            className="w-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              navigate("/library");
            }}
          />
        </div>
        <div className="py-10 px-10">
          <AnimatePresence>
            {currentPlaylist ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {currentPlaylist.songs.map((song) => (
                  <motion.div
                    key={song.videoId}
                    className="flex items-center hover:bg-zinc-800/10 cursor-pointer w-full border-b p-2 min-w-[60vw]"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleCardClick(song.videoId)}
                  >
                    <img
                      src={song.thumbnail}
                      alt={song.title}
                      className="w-20 h-20 object-cover mr-4 rounded-lg"
                    />
                    <div>
                      <h1 className="font-semibold">{song.title}</h1>
                      <p className="text-sm text-gray-400">
                        {song.channelTitle}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <p className="text-center text-gray-400">Playlist not found</p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Playlist;
