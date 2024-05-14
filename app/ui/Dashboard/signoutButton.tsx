"use client";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      className="bg-sky-600 hover:bg-sky-800 text-white shadow-[4px_4px] shadow-black border border-black px-2"
      onClick={() => signOut()}
    >
      logout
    </button>
  );
}
