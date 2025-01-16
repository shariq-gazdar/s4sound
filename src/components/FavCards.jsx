import React, { useContext, useEffect } from "react";
import play from "./playerAssests/play.png";
import dbContext from "../context/DbContext";

function FavCards({ setVideoId, setAllIds, setInfo }) {
  const { dbData } = useContext(dbContext);
  let infoArr;
  const result = dbData.favorites;
  const handleCardClick = (videoId) => {
    setVideoId(videoId);
    setAllIds(result.map((r) => r.videoId));
    infoArr = result.map((r) => ({
      id: r.videoId,
      title: r.title,
      thumbnail: r.thumbnail,
      channelTitle: r.channelTitle,
    }));
    setInfo(infoArr);
  };
  // console.log(result[0].videoId);

  return (
    <div className="flex flex-col w-3/4">
      <h1 className="text-white inline-flex h-fit ml-10 mt-9 font-bold text-4xl  justify-between items-center">
        Favorite Songs :{" "}
        <img
          src={play}
          alt=""
          className="bg-green-600 rounded-full mx-10 w-14"
          title="Play All"
          onClick={() => handleCardClick(result[0].videoId)}
        />
      </h1>
      <div className="w-full mt-10  flex flex-wrap">
        {result.map((r) => {
          // console.log(r);

          return (
            <div
              key={r.videoId}
              className=" bg-neutral-700  flex  items-center hover:bg-neutral-800 min-h-fit mb-6 w-full mx-10 rounded-xl"
              onClick={() => handleCardClick(r.videoId)}
            >
              <img
                src={r.thumbnail}
                alt={r.title}
                className=" w-36  h-16 object-cover pl-2 rounded-2xl"
              />
              <div className="flex flex-col  px-3 py-2 flex-grow">
                <h2 className="text-lg font-bold text-neutral-400 ">
                  {r.title}
                </h2>
                <h3 className="text-neutral-400 ">{r.channelTitle}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FavCards;
