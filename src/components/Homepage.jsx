import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Mainpage from "./Mainpage";
import Player from "./Mainpage/Player";

function Homepage() {
  const [searchTerm, setSearchTerm] = useState(""); // Correctly use setSearchTerm
  console.log(searchTerm, "Homepage");
  const apiUpdating = () => {
    console.log("Updating");
    fetch("https://saavn.dev/api/search?query=Imagine%20Dragons").then(
      (response) => {
        response.json().then((data) => {
          console.log(data);
        });
      }
    );
  };

  return (
    <div className="flex">
      <SideBar />
      <Mainpage getSearch={setSearchTerm} />{" "}
      {/* Pass setSearchTerm as getSearch */}
      <Player />
    </div>
  );
}

export default Homepage;
