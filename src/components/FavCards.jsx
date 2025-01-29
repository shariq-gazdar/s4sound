import React, { useContext, useState } from "react";
import play from "./playerAssests/play.png";
import dbContext from "../context/DbContext";
import fr from "./playerAssests/fav_remove.png";
import { db, auth } from "../config/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

// Updated animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 100 }, // Changed from 200 to -100 for left entrance
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: { duration: 1 },
  },
};

function FavCards({ setVideoId, setAllIds, setInfo }) {
  const { dbData } = useContext(dbContext);
  const [loading, setLoading] = useState(false);
  const result = dbData?.favorites || [];

  const handleCardClick = (videoId) => {
    setVideoId(videoId);
    setAllIds(result.map((r) => r.videoId));
    const infoArr = result.map((r) => ({
      id: r.videoId,
      title: r.title,
      thumbnail: r.thumbnail,
      channelTitle: r.channelTitle,
    }));
    setInfo(infoArr);
  };

  const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 9) {
      return `${words.slice(0, 9).join(" ")}...`;
    }
    return title;
  };

  const removeFav = async (videoId) => {
    setLoading(true);
    const updatedFavorites = result.filter((r) => r.videoId !== videoId);
    if (updatedFavorites) {
      try {
        const userDoc = doc(db, "users", auth.currentUser.email.split("@")[0]);
        await updateDoc(userDoc, { favorites: updatedFavorites });
      } catch (error) {
        console.error("Error updating Firestore:", error);
      }
    }
    setLoading(false);
  };
  // ... keep existing functions unchanged ...

  return (
    <div className="flex flex-col w-full lg:w-3/4">
      {result.length > 0 ? (
        <>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white inline-flex h-fit ml-10 mt-9 font-bold text-4xl justify-between items-center"
          >
            Favorite Songs:
            <motion.img
              src={play}
              alt="Play All"
              className="bg-green-600 rounded-full mx-10 w-14 cursor-pointer"
              title="Play All"
              onClick={() => handleCardClick(result[0]?.videoId)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          </motion.h1>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full mt-10 flex flex-wrap overflow-scroll"
          >
            <AnimatePresence mode="wait">
              {" "}
              {/* Added mode prop */}
              {result.map((r) => (
                <motion.div
                  key={r.videoId}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-neutral-700 flex items-center hover:bg-neutral-800 min-h-fit mb-6 w-full mx-10 rounded-xl cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleCardClick(r.videoId)}
                  layout // Added for smooth layout transitions
                >
                  <motion.img
                    src={r.thumbnail}
                    alt={r.title}
                    className="w-36 h-16 object-cover pl-2 rounded-2xl"
                    layout="position"
                  />
                  <div className="flex flex-col px-3 py-2 flex-grow">
                    <h2 className="text-lg font-bold text-neutral-400">
                      {truncateTitle(r.title)}
                    </h2>
                    <h3 className="text-neutral-400">{r.channelTitle}</h3>
                  </div>
                  <motion.img
                    src={fr}
                    className="w-7 rounded-full mr-2 cursor-pointer"
                    title="Remove from Favorites"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFav(r.videoId);
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </>
      ) : loading ? (
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl text-neutral-400 mt-10 ml-10"
        >
          Loading...
        </motion.h1>
      ) : (
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl text-neutral-400 mt-10 ml-10"
        >
          No Favorites Found. Search for a song to favorite it!
        </motion.h1>
      )}
    </div>
  );
}

export default FavCards;
