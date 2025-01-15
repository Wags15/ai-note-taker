"use client";
import { FileInfo, FolderInfo } from "@/app/types/global";
import FolderCard from "./FolderCard";
import { useState } from "react";

import { insertFolder } from "@/utils/insertInfo";
import { IconContext } from "react-icons";
import { FaRegSquarePlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import FileCard from "./FileCard";

export default function FolderScreen({
  folders,
  files,
  rootFolder,
  userId,
}: {
  folders: FolderInfo[];
  files: FileInfo[];
  rootFolder: FolderInfo;
  userId: string;
}) {
  const router = useRouter();
  const [openNewFolder, setOpenNewFolder] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    insertFolder({ userId: userId, title: newTitle, parent: rootFolder.id! });
    setOpenNewFolder(false);
    setNewTitle("");
  };
  return (
    <div className='flex flex-col m-1 md:m-10'>
      {openNewFolder && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-80'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>
              Enter Title
            </h2>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
              <input
                type='text'
                placeholder='Title'
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
              />
              <div className='flex justify-end space-x-2'>
                <button
                  type='button'
                  onClick={() => setOpenNewFolder(false)}
                  className='px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition'
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div>
        <h1>{rootFolder.title}</h1>
      </div>

      <div className='flex flex-wrap items-center'>
        {folders && (
          <>
            {folders.map((val, idx) => (
              <FolderCard
                key={idx}
                folder={val}
                onClick={() => router.push(`/FolderPage/${val.id}`)}
              />
            ))}
          </>
        )}
        {files && (
          <>
            {files.map((val, idx) => (
              <FileCard
                key={idx}
                file={val}
                onClick={() => router.push(`/FilePage/${val.id}`)}
              />
            ))}
          </>
        )}
        <div
          className='w-[150px] max-h-[100px] bg-slate-200 m-5 rounded-[200px] text-black p-6 flex flex-col justify-center items-center'
          onClick={() => setOpenNewFolder(true)}
        >
          <div className=''>
            <IconContext.Provider
              value={{ className: "shared-class", size: "50" }}
            >
              <FaRegSquarePlus />
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}
