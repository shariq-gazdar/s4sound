import React, { useState, useEffect } from "react";
import Nav from "./Mainpage/Nav";
import CardsContainer from "./CardsContainer";

function Mainpage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-neutral-900 w-3/4">
      <Nav setSearchTerm={setSearchTerm} />
      <CardsContainer />
    </div>
  );
}

export default Mainpage;
