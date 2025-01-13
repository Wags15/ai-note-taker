import { FileInfo, FolderInfo } from "@/app/types/global";
import FolderCard from "./FolderCard";
import { fetchFolderInfo } from "@/utils/fetchInfo";
import { useEffect, useState } from "react";

export default function FolderScreen({
  folders,
  onClickFolder,
  onClickNote,
  rootFolder,
}: {
  folders: FolderInfo[];
  rootFolder: FolderInfo;
  onClickFolder: (folder: FolderInfo) => void;
  onClickNote: (file: FileInfo) => void;
}) {
  return (
    <div className='flex flex-col m-1 md:m-10'>
      <div>
        <h1>{rootFolder.title}</h1>
      </div>

      <div className='flex flex-wrap'>
        {folders.map((val, idx) => (
          <FolderCard key={idx} folder={val} onClick={onClickFolder} />
        ))}
        {/* {files.map((val, idx) => (
          <FolderCard key={idx} />
        ))} */}
      </div>
    </div>
  );
}
