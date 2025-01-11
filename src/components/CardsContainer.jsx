import React from "react";
import "../components/mainStyle.css";

function CardsContainer({ result, setVideoId, setAllIds, setInfo }) {
  if (!result || result.length === 0) {
    return (
      <div className="text-white ml-10">Search for your favorite songs</div>
    );
  }

  const handleCardClick = (videoId) => {
    setVideoId(videoId); // Set the selected video ID
    setAllIds(result.map((r) => r.id.videoId)); // Set all video IDs

    // Prepare the info array and set it
    const infoArr = result.map((r) => {
      const { title, thumbnails, channelTitle } = r.snippet;
      return {
        id: r.id.videoId,
        title: title,
        thumbnail: thumbnails.default.url,
        channelTitle: channelTitle,
      };
    });
    setInfo(infoArr); // Set full info array
  };

  return (
    <div className="text-white flex flex-col gap-y-2  h-[65vh] justify-center w-fit ml-10 overflow-scroll pt-36">
      {result.map((r) => {
        const { title, thumbnails, channelTitle } = r.snippet;

        return (
          <div
            key={r.id.videoId}
            className="bg-neutral-700/85 p-4 rounded-lg flex h-fit items-center gap-y-5 gap-x-2 hover:bg-neutral-700 cursor-pointer w-full pr-20"
            onClick={() => handleCardClick(r.id.videoId)}
          >
            <img src={thumbnails.default.url} alt={title} className="w-20" />
            <div>
              <div className="mt-2 font-bold">{title}</div>
              <div className="text-sm text-gray-400">{channelTitle}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CardsContainer;
