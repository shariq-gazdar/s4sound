import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import dbContext from "../context/DbContext";
import heart from "./playerAssests/fillFav.png";
import plus from "./playerAssests/plus.png";
import Modal from "./AddPlaylistModal";
import { motion } from "framer-motion";

function LibCards() {
  const { dbData } = useContext(dbContext);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const favoritesThumbnail = dbData?.favorites?.[0]?.thumbnail;

  return (
    <>
      {favoritesThumbnail ? (
        <div className="p-10 flex max-h-72 justify-center items-center gap-x-20">
          <motion.div
            className="favorites rounded-2xl bg-zinc-800 hover:bg-green-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9, transition: { duration: 0.3 } }}
            onClick={() => navigate(`/favorites`)}
          >
            <img
              src={favoritesThumbnail}
              alt="Favorites"
              className="w-52 rounded-t-2xl"
            />
            <h1 className="flex items-center text-white p-2 justify-center gap-x-2">
              Favorites
              <img src={heart} alt="Heart Icon" className="w-8" />
            </h1>
          </motion.div>

          <motion.div
            className="addPlaylist flex justify-center items-center border-dashed border w-52 h-52 flex-col rounded-2xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9, transition: { duration: 0.3 } }}
            onClick={() => setModal(true)}
          >
            <img src={plus} alt="Plus Icon" />
            <h1 className="text-white p-2">Make A New Playlist</h1>
          </motion.div>

          {modal && <Modal />}
        </div>
      ) : (
        <div className="flex justify-center items-center h-72">
          <motion.div
            className="addPlaylist flex justify-center items-center border-dashed border w-52 h-52 flex-col rounded-2xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9, transition: { duration: 0.3 } }}
            onClick={() => setModal(true)}
          >
            <img src={plus} alt="Plus Icon" />
            <h1 className="text-white p-2">Make A New Playlist</h1>
          </motion.div>
          {modal && <Modal />}
        </div>
      )}
    </>
  );
}

export default LibCards;
