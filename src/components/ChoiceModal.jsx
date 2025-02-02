import React, { useContext } from "react";
import { motion } from "framer-motion";
import dbContext from "../context/DbContext";
function ChoiceModal({ closeFunc }) {
  const { dbData } = useContext(dbContext);
  const playlists = dbData.playlists;
  return (
    <motion.div
      className="bg-black/50 absolute top-0 left-0 w-screen h-screen flex justify-center items-center"
      onClick={(e) => {
        e.stopPropagation();
        closeFunc(false);
      }}
    >
      <motion.div
        className="modal bg-neutral-800 flex flex-col w-80 gap-y-10 p-10 rounded-xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to parent
      >
        {playlists.map((p) => (
          <motion.button
            key={p.id}
            className="w-full bg-zinc-800 gap-x-10 p-3 text-sm hover:border-blue-400  flex items-center border-y"
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              closeFunc(true);
            }}
          >
            <input type="checkbox" />
            <div className="">{p.name}</div>
          </motion.button>
        ))}
        <motion.button
          className="h-10 bg-green-800 rounded-lg text-white hover:border"
          whileHover={{ scale: 1.02 }}
          onClick={() => {
            console.log("add button");
          }}
        >
          Add
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default ChoiceModal;
