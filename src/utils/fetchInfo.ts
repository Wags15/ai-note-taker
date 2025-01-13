"use client";

import { FileInfo, FolderInfo } from "@/app/types/global";
import { createClient } from "./supabase/client";

const supabase = createClient();
// async function fetchWithCache(queryKey: string, supabaseQuery) {
//     const cachedData = localStorage.getItem(queryKey);
//     if (cachedData) {
//       return JSON.parse(cachedData);
//     }

//     const { data, error } = await supabaseQuery;
//     if (error) throw error;

//     localStorage.setItem(queryKey, JSON.stringify(data));
//     return data;
//   }

export async function fetchFolderInfo({ userId }: { userId: string }) {
  const { data, error } = await supabase
    .from("folders")
    .select("*")
    .eq("user_id", userId);

  const mappedFolders = data?.map(
    (folder): FolderInfo => ({
      id: folder.id,
      title: folder.name,
      parentId: folder.parent,
    })
  );

  return mappedFolders;
}

export async function fetchFileInfo({ userId }: { userId: string }) {
  const { data, error } = await supabase
    .from("files")
    .select("*")
    .eq("user_id", userId);

  const mappedFiles = data?.map(
    (file): FileInfo => ({
      id: file.id,
      title: file.name,
      parentId: file.parent,
    })
  );

  return mappedFiles;
}
