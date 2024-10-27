"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import { Music } from "lucide-react";
import { Button } from "./ui/button";

const AppBar: React.FC = () => {
  const session = useSession();
  console.log(session);

  return (
    <header className="container mx-auto  py-4">
      <nav className="flex flex-wrap items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-purple-900 dark:text-purple-100 flex items-center"
        >
          <Music className="mr-2" />
          Muze Stream Box
        </Link>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <Link
            href="#features"
            className="text-purple-900 dark:text-purple-100 hover:text-purple-700 dark:hover:text-purple-300"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-purple-900 dark:text-purple-100 hover:text-purple-700 dark:hover:text-purple-300"
          >
            How It Works
          </Link>
          {!session.data?.user && (
            <Button
              variant="outline"
              onClick={() => signIn()}
              className="border-purple-900 text-purple-900 hover:bg-purple-900 hover:text-white dark:border-purple-100 dark:text-purple-100 dark:hover:bg-purple-100 dark:hover:text-purple-900"
            >
              Log In
            </Button>
          )}
          {session.data?.user && (
            <Button
              variant="outline"
              onClick={() => signOut()}
              className="border-purple-900 text-purple-900 hover:bg-purple-900 hover:text-white dark:border-purple-100 dark:hover:border-purple-700 dark:bg-purple-100 dark:text-purple-900 dark:hover:bg-purple-500 dark:hover:text-white"
            >
              Log Out
            </Button>
          )}
          {!session.data?.user && (
            <Button
              onClick={() => signIn()}
              className="bg-purple-900 text-white hover:bg-purple-800 dark:bg-purple-100 dark:text-purple-900 dark:hover:bg-purple-200"
            >
              Sign Up
            </Button>
          )}
          <DarkModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default AppBar;
