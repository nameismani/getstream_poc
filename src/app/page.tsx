"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import UserProfile from "@/components/UserProfile";

export default function Home() {
  const { user, loading } = useAuth();

  // Handle localStorage access on client-side only
  useEffect(() => {
    // This is just to ensure localStorage is only accessed client-side
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 w-full">
      {user ? (
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-4 text-center ">
            Welcome, {user.name}!
          </h1>
          <UserProfile />
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full items-center justify-center">
          <h1 className="text-2xl font-bold">Welcome to our App</h1>
          <p>Please sign in or create an account to get started.</p>
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Link
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href="/auth"
            >
              Sign In / Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
