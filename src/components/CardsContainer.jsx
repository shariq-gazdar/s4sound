import React, { useEffect } from "react";
import "../components/mainStyle.css";

<<<<<<< HEAD
function CardsContainer({ result, setVideoId, setInfo }) {
  useEffect(() => {
    // Construct an array of objects containing info for all songs
    const allInfo = result.map((r) => {
      const { title, thumbnails, channelTitle } = r.snippet;
      return {
        id: r.id.videoId,
        title,
        thumbnail: thumbnails.default.url,
        channelTitle,
      };
    });

    // Pass the array to the parent
    setInfo(allInfo);
  }, [result, setInfo]);

=======
function CardsContainer({ result, setVideoId, setAllIds, setInfo }) {
  let infoArr = [];
  let infoLocal = {};
  let id = "";
>>>>>>> bb41abaeec437338d8ce5109953d0f6b4b155c8b
  if (!result || result.length === 0) {
    return (
      <div className="text-white ml-10">Search for your favorite songs</div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="text-white flex flex-col gap-y-2 pt-40 h-[60vh] justify-center w-fit ml-10 overflow-auto">
      {result.map((r) => {
        const { title, thumbnails, channelTitle } = r.snippet;
=======
    <div className="text-white flex flex-col gap-y-2 h-fit  justify-center w-fit ml-10 overflow-auto">
      {result.map((r) => {
        const { title, thumbnails, channelTitle } = r.snippet;
        id = r.id.videoId;
        infoLocal = { id: [title, thumbnails, channelTitle] };
        infoArr.push(infoLocal);
        // console.log(infoArr);
>>>>>>> bb41abaeec437338d8ce5109953d0f6b4b155c8b

        return (
          <div
            key={r.id.videoId}
            className="bg-neutral-700/85 p-4 rounded-lg flex h-fit items-center gap-y-5 gap-x-2 hover:bg-neutral-700 cursor-pointer w-full pr-20"
            onClick={() => {
              setVideoId(r.id.videoId); // Set the selected video ID
            }}
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
