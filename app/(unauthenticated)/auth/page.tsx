import * as React from "react";

import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Authentication } from "./authForm";

export const metadata: Metadata = {
  title: "Auth",
};

export default async function Page() {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return (
    <main>
      <Authentication />
    </main>
  );
}
