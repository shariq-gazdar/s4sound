import React from "react";
import Sidebar from "./SideBar";
import DownRow from "./DownRow";
import LibCards from "./LibCards";

function Playlists() {
  return (
    <div className="flex h-svh">
      <Sidebar />
      <LibCards />
      <DownRow />
    </div>
  );
}

export default Playlists;
