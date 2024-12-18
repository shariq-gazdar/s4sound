import React, { useState } from "react";
import Dummy from "/Coding/Repos/s4sound/src/assets/dummy.png";
import "/Coding/Repos/s4sound/src/style.css";

function Player() {
  const [mainSliderValue, setMainSliderValue] = useState(0);
  const [volumeSliderValue, setVolumeSliderValue] = useState(0);

  const handleMainSliderChange = (e) => {
    setMainSliderValue(e.target.value);
  };

  const handleVolumeSliderChange = (e) => {
    setVolumeSliderValue(e.target.value);
  };

  return (
    <div className="text-white fixed bottom-0 bg-neutral-800 py-5 px-12 flex justify-between w-full items-center">
      {/* Album Art */}
      <img src={Dummy} alt="Album Art" className="w-20 rounded-2xl" />

      {/* Title and Description */}
      <div className="flex flex-col -ml-24">
        <h1>Title</h1>
        <h1>Description</h1>
      </div>

      {/* Player Controls */}
      <div className="player flex flex-col w-full max-w-md justify-center items-center">
        <div className="controls flex justify-center gap-4 mb-4">
          <span className="cursor-pointer ">
            {/* Backward Button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="50px"
              viewBox="0 -960 960 960"
              width="60px"
              fill="#e8eaed"
            >
              <path d="M860-240 500-480l360-240v480Zm-400 0L100-480l360-240v480Zm-80-240Zm400 0Zm-400 90v-180l-136 90 136 90Zm400 0v-180l-136 90 136 90Z" />
            </svg>
          </span>
          <span className="cursor-pointer">
            {/* Play Button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="50px"
              viewBox="0 -960 960 960"
              width="60px"
              fill="#e8eaed"
            >
              <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
            </svg>
          </span>
          <span className="cursor-pointer">
            {/* Forward Button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="50px"
              viewBox="0 -960 960 960"
              width="60px"
              fill="#e8eaed"
            >
              <path d="M100-240v-480l360 240-360 240Zm400 0v-480l360 240-360 240ZM180-480Zm400 0Zm-400 90 136-90-136-90v180Zm400 0 136-90-136-90v180Z" />
            </svg>
          </span>
        </div>

        {/* Main Slider */}
        <input
          type="range"
          name="mainDuration"
          id="mainDuration"
          min="0"
          max="100"
          value={mainSliderValue}
          onChange={handleMainSliderChange}
          style={{
            background: `linear-gradient(to right, green ${mainSliderValue}%, gray ${mainSliderValue}%)`,
          }}
          className="w-1/2 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Volume Control */}
      <div className="flex  items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z" />
        </svg>
        <input
          type="range"
          name="volume"
          id="volume"
          min="0"
          max="100"
          value={volumeSliderValue}
          onChange={handleVolumeSliderChange}
          style={{
            background: `linear-gradient(to right, green ${volumeSliderValue}%, gray ${volumeSliderValue}%)`,
          }}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Player;
