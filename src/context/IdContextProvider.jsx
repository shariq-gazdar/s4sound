import IdContext from "./IdContext";
import React, { useState } from "react";

const IdContextProvider = ({ children }) => {
  const [allIds, setAllIds] = useState(null);
  const [user, setUser] = useState(null);
  return (
    <IdContext.Provider value={{ allIds, setAllIds, user, setUser }}>
      {children}
    </IdContext.Provider>
  );
};

export default IdContextProvider;
