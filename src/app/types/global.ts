// TODO: add all the schema stuff here.

// IMPORTANT: Im pretty sure I can just export the schema directly from supabase... look into this before
// Putting any work into it

export interface FolderInfo {
  id?: string;
  parentId?: string;
  title: string;
}

export interface FileInfo {
  id?: string;
  title: string;
  parentId: string;
}
