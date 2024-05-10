"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="z-10 sticky top-0 bg-slate-100 border-b border-black py-4 px-2 sm:px-8 flex items-center justify-between">
      <div className="flex gap-4 sm:gap-8 md:gap-16 items-center">
        <Link href="/">
          <h1 className="text-2xl sm:text-4xl font-thin">The Logs &#x1f3cb;</h1>
        </Link>
        <ul className="flex gap-2 sm:gap-4 md:gap-8">
          {LINKS.map((link) => (
            <Link
              key={link}
              href={`/${link}`}
              className={`hover:underline underline-offset-2 decoration-1 ${
                pathname === `/${link}` && "underline"
              }`}
            >
              {link}
            </Link>
          ))}
        </ul>
      </div>

      <Link
        href={"/signup"}
        className="py-1 px-2 sm:px-4 border border-black hover:shadow-[4px_4px] rounded-full transition-all"
      >
        coming soon
      </Link>
    </nav>
  );
}

const LINKS = ["workout", "history"];
