"use client";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      className="bg-inherit hover:bg-slate-200 shadow-[4px_4px] shadow-black border border-black px-2"
      onClick={() => signOut()}
    >
      logout
    </button>
  );
}
