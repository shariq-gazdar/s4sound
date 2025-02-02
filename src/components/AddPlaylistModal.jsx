import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db, auth } from "../config/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

function AddPlaylistModal({ closeFunc }) {
  const [playlistName, setPlaylistName] = useState("");
  const handleAdd = async () => {
    const userName = auth.currentUser.email.split("@")[0];
    const docRef = doc(db, "users", userName);
    await updateDoc(docRef, {
      playlists: arrayUnion({ name: playlistName, songs: [] }),
    })
      .then(() => {
        closeFunc(false);
        console.log("Playlist created successfully!");
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <motion.div
      className="bg-black/50 absolute top-0 left-0 w-screen h-screen flex justify-center items-center"
      onClick={(e) => {
        e.stopPropagation();
        closeFunc(false);
      }}
    >
      <motion.div
        className="modal bg-zinc-800 flex flex-col w-80 gap-y-10 p-10 rounded-xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to parent
      >
        <motion.input
          type="text"
          className="bg-transparent ring-1 rounded-lg p-1 ring-green-800 focus:outline-none focus:ring-2 text-white"
          whileHover={{ scale: 1.05 }}
          placeholder="Add a name for your playlist"
          onChange={(e) => {
            setPlaylistName(e.target.value);
          }}
        />
        <motion.button
          className="h-10 bg-green-800 rounded-lg text-white hover:border"
          whileHover={{ scale: 1.02 }}
          onClick={() => {
            handleAdd();
          }}
        >
          Add
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default AddPlaylistModal;
