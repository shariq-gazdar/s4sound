import React, { useState, createContext } from "react";

import PlaylistContext from "./PlaylistContext";

function PlaylistContextProvider({ children }) {
  const [path, setPath] = useState(null);

  return (
    <PlaylistContext.Provider value={{ path, setPath }}>
      {children}
    </PlaylistContext.Provider>
  );
}

export default PlaylistContextProvider;
