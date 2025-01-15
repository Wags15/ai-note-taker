"use client";
import { FileInfo, FolderInfo, NoteInfo } from "@/app/types/global";
import FolderCard from "./FolderCard";
import { useState } from "react";

import { insertFolder } from "@/utils/insertInfo";
import { IconContext } from "react-icons";
import { FaRegSquarePlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function FileScreen({
  notes,
  rootFile,
  userId,
}: {
  notes: NoteInfo[];
  rootFile: FileInfo;
  userId: string;
}) {
  const router = useRouter();
  return (
    <div className='flex m-1 md:m-10'>
      <div className='w-1/2 bg-yellow-200'>{rootFile.title}</div>
      <div className='w-1/2 bg-red-300'>{notes.length}</div>
    </div>
  );
}
