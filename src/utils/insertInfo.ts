"use client";
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

export async function insertFolder({
  userId,
  title,
  parent,
}: {
  userId: string;
  title: string;
  parent: string;
}) {
  const { data, error } = await supabase
    .from("folders")
    .insert({ user_id: userId, name: title, parent: parent });
}

export async function insertFile({
  userId,
  title,
  parent,
}: {
  userId: string;
  title: string;
  parent: string;
}) {
  const { data, error } = await supabase
    .from("files")
    .insert({ user_id: userId, name: title, parentId: parent });

  console.log(error);
}
