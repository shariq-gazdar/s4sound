import React, { useMemo, useState } from "react";
import "../components/mainStyle.css";

function CardsContainer({ result, setVideoId, setAllIds, setInfo }) {
  const idObjects = useMemo(() => {
    const ids = result?.map((r) => r.id.videoId) || [];
    return ids.reduce((obj, id, index) => {
      obj[index] = id;
      return obj;
    }, {});
  }, [result]);

  if (!result || result.length === 0) {
    return (
      <div className="text-white ml-10">Search For Your Favorite Songs</div>
    );
  }

  return (
    <div className="text-white flex flex-col gap-y-2 pt-36 h-[60vh] justify-center w-fit ml-10 overflow-auto">
      {result.map((r) => {
        const { title, thumbnails, channelTitle } = r.snippet;

        return (
          <div
            key={r.id.videoId}
            className="bg-neutral-800 p-4 rounded-lg flex h-fit items-center gap-y-5 gap-x-2"
            onClick={() => {
              setVideoId(r.id.videoId);
              setAllIds(idObjects);

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
