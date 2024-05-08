import Link from "next/link";

export function NavBar() {
  return (
    <nav className="z-10 sticky top-0 bg-slate-100 border-b border-black py-4 px-2 sm:px-8 flex items-center justify-between">
      <div className="flex gap-4 sm:gap-16 items-center">
        <Link href="/">
          <h1 className="text-2xl sm:text-4xl font-thin">The Logs &#x1f3cb;</h1>
        </Link>
        <ul className="flex gap-2 sm:gap-8">
          {LINKS.map((link) => (
            <Link key={link} href={`/${link}`}>
              {link}
            </Link>
          ))}
        </ul>
      </div>

      <Link
        href={"/signup"}
        className="py-1 px-2 sm:px-4 border border-black rounded-full"
      >
        coming soon
      </Link>
    </nav>
  );
}

const LINKS = ["workout", "history", "progress"];
