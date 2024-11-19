"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function client() {
  const { data, status, update } = useSession();
  if (status === "loading") return <h1>loading...</h1>;

  console.log("session data", data);

  return <h1>Hello client page</h1>;
}
