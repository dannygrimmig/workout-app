"use client";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      className="bg-sky-200 border border-black p-2"
      onClick={() => signOut()}
    >
      logout
    </button>
  );
}
