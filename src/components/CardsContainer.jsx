import React, { useContext, useEffect, useState } from "react";
import "../components/mainStyle.css";
import { db, auth } from "../config/firebase";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import Fav from "./playerAssests/favorite.png";
import FillFav from "./playerAssests/fillFav.png";
import dbContext from "../context/DbContext";
import Modal from "./ChoiceModal";
import MediaContext from "../context/MediaContext";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      when: "beforeChildren",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 200 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
    },
  },
};

function CardsContainer({ result }) {
  const [favorites, setFavorites] = useState({});
  const [modal, setModal] = useState(false);
  const { dbData } = useContext(dbContext);
  const { setVideoId, setAllIds, setInfo } = useContext(MediaContext);

  const handleCardClick = (videoId) => {
    console.log("clicked");
    setVideoId(videoId);
    setAllIds(result.map((r) => r.id.videoId));

    const infoArr = result.map((r) => ({
      id: r.id.videoId,
      title: r.snippet.title,
      thumbnail: r.snippet.thumbnails.high.url,
      channelTitle: r.snippet.channelTitle,
    }));
    setInfo(infoArr);
  };

  const toggleFavorite = (videoId, title, channelTitle, thumbnail) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites[videoId]) {
        const updatedFavorites = { ...prevFavorites };
        delete updatedFavorites[videoId];
        return updatedFavorites;
      }
      return {
        ...prevFavorites,
        [videoId]: { title, channelTitle, thumbnail },
      };
    });

    if (!favorites[videoId]) {
      const userDoc = doc(db, "users", auth.currentUser.email.split("@")[0]);
      updateDoc(userDoc, {
        favorites: arrayUnion({ videoId, title, channelTitle, thumbnail }),
      }).catch((error) => console.error("Error updating Firestore:", error));
    }
  };

  return (
    <div className=" text-white flex flex-col gap-y-2 h-[calc(100%-175px)] w-full lg:max-w-[90%] lg:ml-10 overflow-y-auto scrollbar-hide ml-0 overflow-x-hidden  ">
      <AnimatePresence>
        {result?.length ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-y-2"
          >
            {result.map((r) => {
              const { title, thumbnails, channelTitle } = r.snippet;
              const videoId = r.id.videoId;
              const isFavorite =
                favorites[videoId] ||
                dbData?.favorites?.some((fav) => fav.videoId === videoId);

              return (
                <motion.div
                  key={videoId}
                  variants={cardVariants}
                  className="p-4  flex items-center gap-x-4 hover:bg-zinc-800/10 cursor-pointer w-full hover:px-5 border-b"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleCardClick(videoId)}
                >
                  <img src={thumbnails.high.url} alt={title} className="w-20" />
                  <div className="flex-1">
                    <div className="font-bold line-clamp-1">{title}</div>
                    <div className="text-sm text-gray-400">{channelTitle}</div>
                  </div>
                  <motion.img
                    src={isFavorite ? FillFav : Fav}
                    alt={isFavorite ? "Marked as Favorite" : "Mark as Favorite"}
                    className="w-6 cursor-pointer mr-10 "
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(
                        videoId,
                        title,
                        channelTitle,
                        thumbnails.high.url
                      );
                    }}
                  />
                  <motion.span
                    className="-ml-8"
                    whileHover={{ scale: 1.1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setModal(true);
                    }}
                  >
                    ☰
                  </motion.span>
                </motion.div>
              );
            })}
            {modal && <Modal closeFunc={setModal} />}
          </motion.div>
        ) : (
          <div className="text-white ml-10">Search for your favorite songs</div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CardsContainer;
