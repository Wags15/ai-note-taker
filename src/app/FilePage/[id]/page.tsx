import FolderScreen from "@/components/FolderScreen";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/shared/Header";
import {
  fetchFile,
  fetchFileNotes,
  fetchFolder,
  fetchFolderChildren,
} from "@/utils/fetchInfo";
import FileScreen from "@/components/FileScreen";

interface PageProps {
  params: Promise<{ id?: string }>; // Params is now a Promise
}

async function Page({ params }: PageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;

  if (!userId) {
    return <div>Error retrieving user</div>;
  }

  const currFile = await fetchFile({ userId: userId, fileId: id });
  if (!currFile) {
    return <div>Error fetching file</div>;
  }

  const notes = await fetchFileNotes({
    userId: userId,
    fileId: id,
  });
  if (!notes) {
    return <div>Error fetching notes</div>;
  }
  return (
    <div>
      <Header />
      {userId ? (
        <FileScreen rootFile={currFile} notes={notes} userId={userId} />
      ) : (
        <h1>Please Sign In</h1>
      )}
    </div>
  );
}

export default Page;
