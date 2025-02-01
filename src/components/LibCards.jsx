import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dbContext from "../context/DbContext";
import heart from "./playerAssests/fillFav.png";
import plus from "./playerAssests/plus.png";
import Modal from "./AddPlaylistModal";
import { motion } from "framer-motion";

function PlayCards() {
  const { dbData } = useContext(dbContext);
  const [modal, setModal] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    console.log(dbData.favorites[0]);
  });

  return (
    <>
      <div className="p-10 flex max-h-72 justify-center items-center gap-x-20  ">
        <motion.div
          className="favorites rounded-2xl bg-zinc-800 hover:bg-green-700 "
          whileHover={{ scale: 1.02 }}
          whileTap={{
            scale: 0.9,
            transition: { duration: 0.3 },
          }}
          onClick={() => {
            navigate(`/favorites`);
          }}
        >
          <img
            src={dbData.favorites[0].thumbnail}
            alt=""
            className="w-52 rounded-t-2xl"
          />
          <h1 className="flex items-center text-white p-2 justify-center gap-x-2">
            Favorites
            <img src={heart} alt="" className="w-8" />
          </h1>
        </motion.div>
        <motion.div
          className="addPlaylist flex justify-center items-center border-dashed border w-52 h-52 flex-col rounded-2xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{
            scale: 0.9,
            transition: { duration: 0.3 },
          }}
          onClick={() => {
            setModal(true);
          }}
        >
          <img src={plus} alt="" />
          <h1 className="text-white p-2">Make A New Playlist</h1>
        </motion.div>
      </div>
      {modal && <Modal />}
    </>
  );
}

export default PlayCards;
