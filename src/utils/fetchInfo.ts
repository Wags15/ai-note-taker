import { FileInfo, FolderInfo, NoteInfo } from "@/app/types/global";
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
export async function fetchFolderChildrenFiles({
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
      .from("files")
      .select("*")
      .eq("user_id", userId)
      .is("parent", null);

    data = result.data;
    error = result.error;
  } else {
    const result = await supabase
      .from("files")
      .select("*")
      .eq("user_id", userId)
      .eq("parent", folderId);

    data = result.data;
    error = result.error;
  }

  const mappedFiles = data?.map(
    (folder: any): FileInfo => ({
      id: folder.id,
      title: folder.name,
      parentId: folder.parent,
    })
  );

  return mappedFiles;
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

export async function fetchFile({
  userId,
  fileId,
}: {
  userId: string;
  fileId?: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("files")
    .select("*")
    .eq("user_id", userId)
    .eq("id", fileId);

  const mappedFiles = data?.map(
    (file): FileInfo => ({
      id: file.id,
      title: file.name,
      parentId: file.parent,
    })
  );
  if (mappedFiles) {
    return mappedFiles[0];
  } else {
    return undefined;
  }
}

export async function fetchFileNotes({
  userId,
  fileId,
}: {
  userId: string;
  fileId?: string;
}) {
  const supabase = await createClient();

  let data, error;
  if (!fileId) {
    const result = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", userId)
      .is("parent", null);

    data = result.data;
    error = result.error;
  } else {
    const result = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", userId)
      .eq("parent", fileId);

    data = result.data;
    error = result.error;
  }

  const mappedNotes = data?.map(
    (note: any): NoteInfo => ({
      id: note.id,
      slide: note.slide,
      parentId: note.parent,
      index: note.index,
      notes: note.notes,
      summary: note.summary,
    })
  );

  return mappedNotes;
}
