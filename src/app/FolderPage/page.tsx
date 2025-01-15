import FolderScreen from "@/components/FolderScreen";

import { createClient } from "@/utils/supabase/server";
import Header from "@/components/shared/Header";
import { fetchFolder, fetchFolderChildren } from "@/utils/fetchInfo";

async function Page() {
  // const router = useRouter();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;

  if (!userId) {
    return <div>Error retrieving user</div>;
  }

  const currFolder = await fetchFolder({ userId: userId, folderId: undefined });
  if (!currFolder) {
    return <div>Error fetching folder</div>;
  }

  const currFolders = await fetchFolderChildren({
    userId: userId,
    folderId: undefined,
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
