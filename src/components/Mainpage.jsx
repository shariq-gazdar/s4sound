import React, { useState, useEffect } from "react";
import Nav from "./Mainpage/Nav";

function Mainpage({ getSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getSearch(searchTerm);
  }, [searchTerm, getSearch]);

  return (
    <div className="bg-neutral-900 w-3/4">
      <Nav getSearchTerm={setSearchTerm} />
    </div>
  );
}

export default Mainpage;
