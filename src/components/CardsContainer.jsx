import React, { useState } from "react";
import "../components/mainStyle.css";
import Fav from "./playerAssests/favorite.png";
import FillFav from "./playerAssests/fillFav.png";
import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";

function CardsContainer({ result, setVideoId, setAllIds, setInfo }) {
  const [favorites, setFavorites] = useState([]);

  if (!result || result.length === 0) {
    return (
      <div className="text-white ml-10">Search for your favorite songs</div>
    );
  }

  const handleCardClick = (videoId) => {
    setVideoId(videoId);
    setAllIds(result.map((r) => r.id.videoId));

    const infoArr = result.map((r) => {
      const { title, thumbnails, channelTitle } = r.snippet;
      return {
        id: r.id.videoId,
        title: title,
        thumbnail: thumbnails.default.url,
        channelTitle: channelTitle,
      };
    });
    setInfo(infoArr);
  };

  const handleFavorite = async (item) => {
    try {
      const docRef = await addDoc(collection(db, "Favorites"), {
        id: item.id.videoId,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.default.url,
      });
      console.log("Document added with ID:", docRef.id);

      setFavorites((prev) => [...prev, item.id.videoId]);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const handleRemoveFavorite = (videoId) => {
    setFavorites((prev) => prev.filter((fav) => fav !== videoId));
  };

  return (
    <div className="text-white flex flex-col gap-y-2 h-[calc(100%-175px)] w-full max-w-[90%] ml-10 overflow-y-auto scrollbar-hide">
      {result.map((r) => {
        const { title, thumbnails, channelTitle } = r.snippet;
        const isFavorite = favorites.includes(r.id.videoId);

        return (
          <div
            key={r.id.videoId}
            className="bg-neutral-700/85 p-4 rounded-lg flex items-center gap-x-4 hover:bg-neutral-700 cursor-pointer w-full"
            onClick={() => handleCardClick(r.id.videoId)}
          >
            <img src={thumbnails.default.url} alt={title} className="w-20" />
            <div className="flex-1">
              <div className="font-bold line-clamp-1">{title}</div>
              <div className="text-sm text-gray-400">{channelTitle}</div>
            </div>
            {isFavorite ? (
              <img
                src={FillFav}
                alt="Marked as Favorite"
                className="w-6 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering parent onClick
                  handleRemoveFavorite(r.id.videoId);
                }}
              />
            ) : (
              <img
                src={Fav}
                alt="Mark as Favorite"
                className="w-8 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering parent onClick
                  handleFavorite(r);
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CardsContainer;
