import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import dbContext from "../context/DbContext";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
function ChoiceModal({ closeFunc, id, title, channelTitle, thumbnail }) {
  const { dbData } = useContext(dbContext);
  const playlists = dbData.playlists;
  const docAdd = async (id, title, channelTitle, thumbnail, index, docRef) => {
    try {
      const userSnap = await getDoc(docRef);
      if (userSnap.exists()) {
        // console.log(userSnap.data().playlists);
        const playlists = userSnap.data().playlists || [];
        playlists[index].songs.push({
          title: title,
          channelTitle: channelTitle,
          thumbnail: thumbnail,
          videoId: id,
        });
        await updateDoc(docRef, { playlists });
      } else {
        console.log("User document not found!");
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const addToSong = async (target) => {
    // console.log(playlists);
    playlists.forEach((playlist, index) => {
      if (playlist.name == target) {
        const docRef = doc(db, "users", auth.currentUser.email.split("@")[0]);
        docAdd(id, title, channelTitle, thumbnail, index, docRef)
          .then(() => {
            closeFunc(false);
          })
          .catch((err) => {
            alert(err);
          });
      }
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
        className="modal bg-neutral-800 flex flex-col w-80 gap-y-10 p-10 rounded-xl items-center"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Your Playlists:</h1>
        {playlists.map((p) => (
          <motion.button
            key={p.name}
            className="w-full bg-zinc-800 gap-x-10 p-3 text-sm hover:border-blue-400  flex items-center border-y"
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              closeFunc(true);
              addToSong(p.name);
            }}
          >
            <div className="">{p.name}</div>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default ChoiceModal;

// playlists: [
//   {
//     name: "Rap",
//     songs: [],
//   },
// ];
