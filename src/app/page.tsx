"use client";
import FolderCard from "@/components/FolderCard";
import { useState } from "react";

export default function Home() {
  const [folders, setFolders] = useState([0, 1, 2, 3, 4, 6, 7, 7, 7, 7, 7]);
  return (
    <div className='flex flex-col'>
      <div>
        <h1>Your Folders:</h1>
      </div>

      <div className='flex flex-wrap'>
        {folders.map((val) => (
          <FolderCard />
        ))}
      </div>
    </div>
  );
}
