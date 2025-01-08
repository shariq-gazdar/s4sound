import React, { useMemo, useState } from "react";
import "../components/mainStyle.css";

function CardsContainer({ result, setVideoId, setAllIds, setInfo }) {
  let ids = [];

  if (!result || result.length === 0) {
    return (
      <div className="text-white ml-10">Search For Your Favorite Songs</div>
    );
  }

  return (
    <div className="text-white flex flex-col gap-y-2 pt-36 h-[60vh] justify-center w-fit ml-10 overflow-auto">
      {result.map((r) => {
        const { title, thumbnails, channelTitle } = r.snippet;
        ids.push(r.id.videoId);

        return (
          <div
            key={r.id.videoId}
            className="bg-neutral-700/85 p-4 rounded-lg flex h-fit items-center gap-y-5 gap-x-2 hover:bg-neutral-700 cursor-pointer w-fill pr-20"
            onClick={() => {
              setVideoId(r.id.videoId);
              setAllIds(ids);

              // Directly set the info without using local state
              setInfo({
                title,
                channelTitle,
                thumbnail: thumbnails.default.url,
              });
            }}
          >
            <img src={thumbnails.default.url} alt={title} className="w-20" />
            <div className="mt-2 font-bold">{title}</div>
          </div>
        );
      })}
    </div>
  );
}

export default CardsContainer;
