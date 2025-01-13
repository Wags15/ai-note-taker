import { FolderInfo } from "@/app/types/global";
import { insertFolder } from "@/utils/insertInfo";
import React, { useState } from "react";

export default function CreateFolderCard({
  userId,
  currFolder,
}: {
  userId: string;
  currFolder: FolderInfo;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    insertFolder({ userId: userId, title: title, parent: currFolder.id! });
    setIsOpen(false);
    setTitle("");
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <button
        onClick={() => setIsOpen(true)}
        className='px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition'
      >
        Open Form
      </button>

      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-80'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>
              Enter Title
            </h2>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
              <input
                type='text'
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
              />
              <div className='flex justify-end space-x-2'>
                <button
                  type='button'
                  onClick={() => setIsOpen(false)}
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
    </div>
  );
}
