import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dbContext from "../context/DbContext";
import heart from "./playerAssests/fillFav.png";
import plus from "./playerAssests/plus.png";
import Modal from "./AddPlaylistModal";
import dummy from "./playerAssests/dummy.png";
import del from "./playerAssests/delete.svg";
import { updateDoc, arrayRemove, doc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "../config/firebase";

function LibCards() {
  const { dbData } = useContext(dbContext);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const favoritesThumbnail = dbData?.favorites?.[0]?.thumbnail;
  const playlists = dbData?.playlists;
  const deletePlaylists = async (title) => {
    const docRef = doc(db, "users", auth.currentUser.email.split("@")[0]);
    console.log(title);
    await updateDoc(docRef, {
      playlists: arrayRemove(title),
    });
    window.location.reload();
  };

  return (
    <>
      <div className="p-10 grid grid-rows-2 grid-cols-3 gap-x-10  max-h-[90%] overflow-scroll lg:max-h-[100%]">
        {favoritesThumbnail && (
          <motion.div
            className="favorites rounded-2xl bg-zinc-800 hover:bg-green-700 w-52 h-[105%]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9, transition: { duration: 0.3 } }}
            onClick={() => navigate(`/favorites`)}
          >
            <img
              src={favoritesThumbnail}
              alt="Favorites"
              className="w-52 h-52 object-cover rounded-t-2xl"
            />
            <h1 className="flex items-center text-white p-2 justify-center gap-x-2">
              Favorites
              <img src={heart} alt="Heart Icon" className="w-8" />
            </h1>
          </motion.div>
        )}

        {playlists?.map((playlist, index) => (
          <motion.div
            key={index}
            className="playlist rounded-2xl bg-zinc-800 hover:bg-green-700 w-52 relative h-[105%]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9, transition: { duration: 0.3 } }}
            onClick={() => navigate(`/playlist/${playlist.id}`)}
          >
            <img
              src={playlist.songs[0]?.thumbnail || dummy}
              alt="Playlist"
              className="w-52 h-52 object-cover rounded-t-2xl"
            />
            <motion.img
              src={del}
              alt=""
              onClick={(e) => {
                e.stopPropagation();
                deletePlaylists(playlist);
              }}
              className="absolute right-5 top-5 w-10"
              whileHover={{ scale: 1.1 }}
              title="Delete this playlist"
            />
            <h1 className="flex items-center text-white p-2 justify-center gap-x-2 truncate px-4">
              {playlist.name}
            </h1>
          </motion.div>
        ))}

        <motion.div
          className="addPlaylist flex justify-center items-center border-dashed border-2 border-zinc-600 w-52 h-[105%] flex-col rounded-2xl cursor-pointer hover:border-green-500 "
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.9, transition: { duration: 0.3 } }}
          onClick={() => setModal(true)}
        >
          <img src={plus} alt="Plus Icon" className="w-16 opacity-60" />
          <h1 className="text-white p-2 text-center">Create New Playlist</h1>
        </motion.div>
      </div>

      <AnimatePresence>
        {modal && <Modal closeFunc={setModal} />}
      </AnimatePresence>
    </>
  );
}

export default LibCards;
