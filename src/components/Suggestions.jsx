import { h1 } from "framer-motion/client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
function Suggestions({ suggest, setSearchTerm }) {
  return (
    <div>
      {suggest.map((suggestion, index) => {
        return (
          <motion.h1
            key={index}
            className="text-white cursor-pointer hover:bg-neutral-800 rounded-xl px-5 py-1"
            onClick={(e) => {
              setSearchTerm(e.target.innerHTML);
            }}
          >
            {suggestion}
          </motion.h1>
        );
      })}
    </div>
  );
}

export default Suggestions;
