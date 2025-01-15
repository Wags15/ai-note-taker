"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Header() {
  const router = useRouter();

  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);

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

  const goBack = () => {
    router.back();
  };

  return (
    <div className='w-full h-10 bg-slate-300 flex justify-between align-middle items-center'>
      <button onClick={goBack}>
        <IconContext.Provider value={{ className: "shared-class", size: "30" }}>
          <IoMdArrowRoundBack />
        </IconContext.Provider>
      </button>
      <button
        onClick={async () => {
          const router = useRouter();
          if (userId) {
            const response = await fetch("/api/signout");
            supabase.auth.signOut();
          } else {
            router.push("/Login");
          }
        }}
      >
        {userId ? "Sign Out" : "Sign In"}
      </button>
    </div>
  );
}
