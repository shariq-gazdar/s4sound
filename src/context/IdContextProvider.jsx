import IdContext from "./IdContext";
import React, { useState } from "react";

const IdContextProvider = ({ children }) => {
  const [allIds, setAllIds] = useState(null);

  return (
    <IdContext.Provider value={{ allIds, setAllIds }}>
      {children}
    </IdContext.Provider>
  );
};

export default IdContextProvider;
