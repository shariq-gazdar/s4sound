import React, { useContext, useState } from "react";
import "../components/mainStyle.css";
import { db, auth } from "../config/firebase";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import Fav from "./playerAssests/favorite.png";
import FillFav from "./playerAssests/fillFav.png";
import dbContext from "../context/DbContext";
import { motion } from "framer-motion";

function CardsContainer({ result, setVideoId, setAllIds, setInfo }) {
  const [favorites, setFavorites] = useState({});
  const { dbData } = useContext(dbContext);
  const [ani, setAni] = useState(0);
  const handleCardClick = (videoId) => {
    setVideoId(videoId);
    setAllIds(result.map((r) => r.id.videoId));

    const infoArr = result.map((r) => ({
      id: r.id.videoId,
      title: r.snippet.title,
      thumbnail: r.snippet.thumbnails.default.url,
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
    <div className="text-white flex flex-col gap-y-2 h-[calc(100%-175px)] w-full max-w-[90%] lg:ml-10 overflow-y-auto scrollbar-hide ml-0 overflow-x-hidden">
      {result?.length ? (
        result.map((r) => {
          const { title, thumbnails, channelTitle } = r.snippet;
          const videoId = r.id.videoId;
          const isFavorite =
            favorites[videoId] ||
            dbData?.favorites?.some((fav) => fav.videoId === videoId);

          return (
            <motion.div
              key={videoId}
              className="bg-neutral-700/85 p-4 rounded-lg flex items-center gap-x-4 hover:bg-neutral-700 cursor-pointer w-full hover:w-[calc(100-50)%]"
              initial={{ x: 500 }}
              animate={{ x: 0 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleCardClick(videoId)}
            >
              <img src={thumbnails.default.url} alt={title} className="w-20" />
              <div className="flex-1">
                <div className="font-bold line-clamp-1">{title}</div>
                <div className="text-sm text-gray-400">{channelTitle}</div>
              </div>
              <img
                src={isFavorite ? FillFav : Fav}
                alt={isFavorite ? "Marked as Favorite" : "Mark as Favorite"}
                className="w-6 cursor-pointer mr-10"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent onClick
                  toggleFavorite(
                    videoId,
                    title,
                    channelTitle,
                    thumbnails.default.url
                  );
                }}
              />
            </motion.div>
          );
        })
      ) : (
        <div className="text-white ml-10">Search for your favorite songs</div>
      )}
    </div>
  );
}

export default CardsContainer;
