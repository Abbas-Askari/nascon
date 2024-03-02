"use client";

import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { ThemePicker } from "./themePicker";
import { SearchBar } from "./searchbar";
import { useAppSelector } from "@/lib/hooks";
import { UserNav } from "./userNav";
import Link from "next/link";

export const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className="stickey top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="h-6 w-6"
            >
              <rect width="256" height="256" fill="none"></rect>
              <line
                x1="208"
                y1="128"
                x2="128"
                y2="208"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></line>
              <line
                x1="192"
                y1="40"
                x2="40"
                y2="192"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></line>
            </svg>
            <span className="hidden font-bold sm:inline-block">Taha Shah</span>
          </a>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/market"
              className="transition-colors hover:text-foreground text-foreground/60"
              >Market</Link>
            <Link href="/resources"
              className="transition-colors hover:text-foreground text-foreground/60"
              >Resources</Link>
            {/* <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/docs"
            >
              Docs
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/docs/components"
            >
              Components
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/themes"
            >
              Themes
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground"
              href="/examples"
            >
              Examples
            </a>
            <a
              className="hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
              href="https://github.com/shadcn-ui/ui"
            >
              GitHub
            </a> */}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {user && (
            <>
              <SearchBar />
            </>
          )}
          <nav className="flex items-center">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/TahaShah141"
            >
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
                <GitHubLogoIcon className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/tahashah327/"
            >
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
                <InstagramLogoIcon className="h-4 w-4 fill-current" />
                <span className="sr-only">Instagram</span>
              </div>
            </a>
          </nav>
          <ThemePicker />
          {user && <UserNav user={user} />}
        </div>
      </div>
    </header>
  );
};
