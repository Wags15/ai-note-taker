"use client";
import FolderCard from "@/components/FolderCard";
import FolderScreen from "@/components/FolderScreen";
import { createClient } from "@/utils/supabase/client";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FolderInfo } from "./types/global";
import { fetchFolderInfo } from "@/utils/fetchInfo";
import { IconContext } from "react-icons";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Home() {
  const [currFolder, setCurrFolder] = useState<FolderInfo>({
    title: "Your Notes",
  });
  const router = useRouter();
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [folders, setFolders] = useState<FolderInfo[]>([]);

  const [currFolders, setCurrentFolders] = useState<FolderInfo[]>([]);

  const updateCurrFolders = (folders: FolderInfo[], root: string | null) => {
    const matchingFolders = folders.filter(
      (folder) => folder.parentId === root
    );
    setCurrentFolders(matchingFolders);
  };

  const onClickFolder = (folder: FolderInfo) => {
    setCurrFolder(folder);
    updateCurrFolders(folders, folder.id || null);
  };

  useEffect(() => {
    const checkSignedInStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
      }
    };
    checkSignedInStatus();
  }, []);

  useEffect(() => {
    const fetchFolders = async () => {
      const folderInfo = await fetchFolderInfo({ userId: userId || "" });
      setFolders(folderInfo || []);
      updateCurrFolders(folderInfo || [], null);
    };
    if (userId) {
      fetchFolders();
    }
  }, [userId]);

  const goBack = () => {
    const parentId = currFolder.parentId;
    if (parentId) {
      const parent = folders.find(
        (folder) => folder.id === currFolder.parentId
      );
      setCurrFolder(parent!);
      updateCurrFolders(folders, parentId);
    } else {
      setCurrFolder({ title: "Your Notes" });
      updateCurrFolders(folders, null);
    }
  };

  return (
    <>
      <div className='w-full h-10 bg-slate-300 flex justify-between align-middle items-center'>
        <button onClick={goBack}>
          <IconContext.Provider
            value={{ className: "shared-class", size: "30" }}
          >
            <IoMdArrowRoundBack />
          </IconContext.Provider>
        </button>
        <button
          onClick={async () => {
            if (userId) {
              const response = await fetch("/api/signout");
              supabase.auth.signOut();
              setUserId(null);
            } else {
              router.push("/Login");
            }
          }}
        >
          {userId ? "Sign Out" : "Sign In"}
        </button>
      </div>
      {userId ? (
        <FolderScreen
          rootFolder={currFolder}
          folders={currFolders}
          onClickFolder={onClickFolder}
          onClickNote={() => {}}
        />
      ) : (
        <h1>Please Sign In</h1>
      )}
    </>
  );
}
