import FolderScreen from "@/components/FolderScreen";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/shared/Header";
import { fetchFolder, fetchFolderChildren } from "@/utils/fetchInfo";

interface PageProps {
  params: Promise<{ id?: string }>; // Params is now a Promise
}

async function Page({ params }: PageProps) {
  const { id } = await params;

  // const router = useRouter();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;

  if (!userId) {
    return <div>Error retrieving user</div>;
  }

  const currFolder = await fetchFolder({ userId: userId, folderId: id });
  if (!currFolder) {
    return <div>Error fetching folder</div>;
  }

  const currFolders = await fetchFolderChildren({
    userId: userId,
    folderId: id,
  });
  if (!currFolders) {
    return <div>Error fetching folder</div>;
  }
  return (
    <div>
      <Header />
      {userId ? (
        <FolderScreen
          rootFolder={currFolder}
          folders={currFolders}
          userId={userId}
        />
      ) : (
        <h1>Please Sign In</h1>
      )}
    </div>
  );
}

export default Page;
