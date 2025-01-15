import { FileInfo, FolderInfo } from "@/app/types/global";
import { createClient } from "./supabase/server";

export async function fetchFolder({
  userId,
  folderId,
}: {
  userId: string;
  folderId?: string;
}) {
  const supabase = await createClient();

  if (!folderId) {
    return { title: "Your Notes" };
  }
  const { data, error } = await supabase
    .from("folders")
    .select("*")
    .eq("user_id", userId)
    .eq("id", folderId);

  const mappedFolders = data?.map(
    (folder): FolderInfo => ({
      id: folder.id,
      title: folder.name,
      parentId: folder.parent,
    })
  );

  if (mappedFolders) {
    return mappedFolders[0];
  } else {
    return undefined;
  }
}
export async function fetchFolderChildren({
  userId,
  folderId,
}: {
  userId: string;
  folderId?: string;
}) {
  const supabase = await createClient();

  let data, error;
  if (!folderId) {
    const result = await supabase
      .from("folders")
      .select("*")
      .eq("user_id", userId)
      .is("parent", null);

    data = result.data;
    error = result.error;
  } else {
    const result = await supabase
      .from("folders")
      .select("*")
      .eq("user_id", userId)
      .eq("parent", folderId);

    data = result.data;
    error = result.error;
  }

  const mappedFolders = data?.map(
    (folder: any): FolderInfo => ({
      id: folder.id,
      title: folder.name,
      parentId: folder.parent,
    })
  );

  return mappedFolders;
}

export async function fetchFileInfo({ userId }: { userId: string }) {
  const supabase = await createClient();

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
