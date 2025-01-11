import React from "react";

function FavCards({ result }) {
  return (
    <div className="w-full mt-10 ml-10 flex flex-wrap gap-10">
      {result.map((r) => {
        return (
          <div
            key={r.id}
            className="w-72 bg-neutral-700 rounded-2xl flex flex-col justify-between hover:bg-neutral-800 h-80 mb-6"
          >
            <img
              src={r.thumbnail}
              alt={r.title}
              className="rounded-t-2xl w-full h-48 object-cover"
            />
            <div className="flex flex-col items-center px-3 py-2 flex-grow">
              <h2 className="text-lg font-bold text-neutral-400 text-center">
                {r.title}
              </h2>
              <h3 className="text-neutral-400 text-center">{r.channelTitle}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FavCards;
