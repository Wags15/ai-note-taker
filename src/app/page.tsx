"use client";
import FolderCard from "@/components/FolderCard";
import { createClient } from "@/utils/supabase/client";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [folders, setFolders] = useState([0, 1, 2, 3, 4, 6, 7, 7, 7, 7, 7]);
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const checkSignedInStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setIsSignedIn(true);
      }
    };
    checkSignedInStatus();
  }, []);
  return (
    <>
      <div className='w-full h-10 bg-slate-300 flex justify-end align-middle items-center'>
        <button
          onClick={async () => {
            if (isSignedIn) {
              const response = await fetch("/api/signout");
              supabase.auth.signOut();
              setIsSignedIn(false);
            } else {
              router.push("/Login");
            }
          }}
        >
          {isSignedIn ? "Sign Out" : "Sign In"}
        </button>
      </div>
      <div className='flex flex-col m-1 md:m-10'>
        <div>
          <h1>Your Folders:</h1>
        </div>

        <div className='flex flex-wrap'>
          {folders.map((val, idx) => (
            <FolderCard key={idx} />
          ))}
        </div>
      </div>
    </>
  );
}
