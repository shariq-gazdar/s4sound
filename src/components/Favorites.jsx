import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import Sidebar from "./SideBar";

function Favorites() {
  return (
    <div>
      <Sidebar />
    </div>
  );
}

export default Favorites;
