import React, { useEffect } from "react";
import "../components/mainStyle.css";

function CardsContainer({ searchTerm, result, setVideoId }) {
  if (!result || result.length === 0) {
    return <div className="text-white ml-10">No results found</div>;
  }
  console.log(result);

  return (
    <div className="text-white flex flex-col gap-y-2 pt-36 h-[60vh] justify-center w-fit ml-10 overflow-auto">
      {result.map((r) => {
        const { title, thumbnails, channelId } = r.snippet;
        return (
          <div
            key={title}
            className="bg-neutral-800 p-4 rounded-lg flex h-fit items-center gap-y-5 gap-x-2"
            onClick={() => {
              setVideoId(r.id.videoId);
            }}
          >
            {/* {console.log(r)} */}
            <img src={thumbnails.default.url} alt={title} className="w-20" />
            <div className="mt-2 font-bold">{title}</div>
          </div>
        );
      })}
    </div>
  );
}

export default CardsContainer;
