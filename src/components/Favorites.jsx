import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import { getDocs, doc, collection } from "firebase/firestore";
import Sidebar from "./SideBar";
import FavCards from "./FavCards";
import YtAudioPlayer from "./YtAudioPlayer";
import DownRow from "./DownRow";

function Favorites() {
  const [videoId, setVideoId] = useState("");
  const [allIds, setAllIds] = useState([]);
  const [info, setInfo] = useState([]);
  // console.log(info);
  console.log(allIds);

  return (
    <div className="flex h-svh">
      <Sidebar />
      <FavCards
        setAllIds={setAllIds}
        setVideoId={setVideoId}
        setInfo={setInfo}
        info={info}
      />

      <DownRow />
    </div>
  );
}

export default Favorites;
