import React, { useContext } from "react";
import play from "./playerAssests/play.png";
import dbContext from "../context/DbContext";
import fr from "./playerAssests/fav_remove.png";
import { db, auth } from "../config/firebase";
import { updateDoc, arrayUnion, doc } from "firebase/firestore";

function FavCards({ setVideoId, setAllIds, setInfo }) {
  const { dbData, setDbData } = useContext(dbContext); // Assuming `setDbData` is available for context updates
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

  const removeFav = (videoId) => {
    const updatedFavorites = result.filter((r) => r.videoId !== videoId);
    // console.log(updatedFavorites);

    if (updatedFavorites && result.length > 0) {
      const userDoc = doc(db, "users", auth.currentUser.email.split("@")[0]);
      updateDoc(userDoc, {
        favorites: updatedFavorites,
      }).catch((error) => console.error("Error updating Firestore:", error));
    }
  };

  return (
    <div className="flex flex-col w-3/4">
      <h1 className="text-white inline-flex h-fit ml-10 mt-9 font-bold text-4xl justify-between items-center">
        Favorite Songs:
        <img
          src={play}
          alt="Play All"
          className="bg-green-600 rounded-full mx-10 w-14 cursor-pointer"
          title="Play All"
          onClick={() => handleCardClick(result[0]?.videoId)}
        />
      </h1>
      <div className="w-full mt-10 flex flex-wrap overflow-scroll">
        {result.map((r) => (
          <div
            key={r.videoId}
            className="bg-neutral-700 flex items-center hover:bg-neutral-800 min-h-fit mb-6 w-full mx-10 rounded-xl cursor-pointer"
            onClick={() => handleCardClick(r.videoId)}
          >
            <img
              src={r.thumbnail}
              alt={r.title}
              className="w-36 h-16 object-cover pl-2 rounded-2xl"
            />
            <div className="flex flex-col px-3 py-2 flex-grow">
              <h2 className="text-lg font-bold text-neutral-400">{r.title}</h2>
              <h3 className="text-neutral-400">{r.channelTitle}</h3>
            </div>
            <img
              src={fr}
              className="w-7 rounded-full mr-2 cursor-pointer"
              title="Remove from Favorites"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering parent onClick
                removeFav(r.videoId);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavCards;
