"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import AuthForm from "@/components/AuthForm";
import Navbar from "@/components/Navbar";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to home if user is already logged in
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="w-full max-w-md">
          <AuthForm mode={mode} onToggleMode={toggleMode} />
        </div>
      </div>
    </div>
  );
}
