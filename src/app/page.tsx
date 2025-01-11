"use client";
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
          <div className='w-[300px] h-[200px] bg-slate-200 m-5'>{val}</div>
        ))}
      </div>
    </div>
  );
}
