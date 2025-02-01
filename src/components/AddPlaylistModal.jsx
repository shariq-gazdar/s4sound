import React from "react";
import { motion } from "framer-motion";
function AddPlaylistModal() {
  return (
    <div className="bg-black/50 absolute top-0 left-0 w-screen h-screen flex justify-center items-center ">
      <div className="modal bg-zinc-800 flex flex-col w-80 gap-y-10 p-10 rounded-xl">
        <motion.input
          type="text"
          className="bg-transparent ring-1 rounded-lg p-1 ring-green-800 focus:outline-none focus:ring-2 text-white"
          whileHover={{ scale: 1.05 }}
          placeholder="Add a name for your playlist "
        />
        <motion.button className="h-10 bg-green-800 rounded-lg text-white ">
          Add
        </motion.button>
      </div>
    </div>
  );
}

export default AddPlaylistModal;
