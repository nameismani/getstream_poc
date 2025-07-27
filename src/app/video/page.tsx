"use client";

import { useEffect } from "react";
import VideoLobby from "@/components/video/VideoLobby";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function VideoPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is not authenticated and not loading, redirect to auth page
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Video Meetings</h1>

          <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              How it works
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-blue-700">
              <li>Create a new meeting to generate a unique meeting ID</li>
              <li>Share the meeting ID or link with others so they can join</li>
              <li>Join an existing meeting by entering its ID</li>
              <li>
                Your camera and microphone will be activated when you join
              </li>
              <li>End the call by clicking the red hang-up button</li>
            </ul>
          </div>

          <VideoLobby />

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Powered by Stream</h2>
            <p className="text-gray-600 text-sm">
              This video meeting functionality is powered by Stream's Video API,
              providing high-quality, reliable video calls with low latency
              through a global edge network.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
