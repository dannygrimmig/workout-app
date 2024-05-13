import { Authentication } from "@/app/ui/Auth/authForm";
import * as React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
};

export default function Page() {
  return (
    <main>
      <Authentication />
    </main>
  );
}
