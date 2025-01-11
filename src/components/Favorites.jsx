import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import { getDocs, doc, collection } from "firebase/firestore";
import Sidebar from "./SideBar";
import FavCards from "./FavCards";

function Favorites() {
  const [result, setResult] = useState([]);
  let res = [];
  async function fetchDocumentIds() {
    try {
      const querySnapshot = await getDocs(collection(db, "Favorites"));
      querySnapshot.forEach((doc) => {
        console.log("Document ID:", doc.id); // The document ID
        console.log("Document Data:", doc.data()); // The document data
        res.push(doc.data());
        setResult(res); // Update the result array with the fetched data
        console.log(res);
      });
    } catch (error) {
      console.error("Error fetching document IDs:", error);
    }
  }
  useEffect(() => {
    fetchDocumentIds();
  });
  return (
    <div className="flex h-svh">
      <Sidebar />
      <FavCards result={result} />
    </div>
  );
}

export default Favorites;
