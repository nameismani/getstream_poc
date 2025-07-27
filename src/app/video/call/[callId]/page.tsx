"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useStream } from "@/contexts/StreamContext";
import VideoCallLayout from "@/components/video/VideoCallLayout";
import { useRouter } from "next/navigation";

export default function CallPage() {
  const { callId } = useParams();
  const { user, loading: authLoading } = useAuth();
  const { client, isLoading: streamLoading } = useStream();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // If user is not authenticated and not loading, redirect to auth page
    if (!authLoading && !user) {
      router.push("/auth");
    }
  }, [user, authLoading, router]);

  if (authLoading || streamLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // This will be handled by the useEffect redirect
  }

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Connection Error
          </h2>
          <p className="mb-4">
            Failed to connect to Stream. Please try again later.
          </p>
          <button
            onClick={() => router.push("/video")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Video Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!callId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Invalid Call</h2>
          <p className="mb-4">No call ID provided.</p>
          <button
            onClick={() => router.push("/video")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Video Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <VideoCallLayout callId={callId as string} client={client} />;
}
