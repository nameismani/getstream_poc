"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStream } from "@/contexts/StreamContext";
import { useAuth } from "@/contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

export default function VideoLobby() {
  const [callId, setCallId] = useState("");
  const [createdCallId, setCreatedCallId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { createCall, joinCall, client, isLoading } = useStream();
  const { user } = useAuth();
  const router = useRouter();

  const handleCreateMeeting = async () => {
    try {
      setError(null);
      setIsCreating(true);

      // Generate a unique meeting ID
      const newCallId = uuidv4().substring(0, 12);
      setCreatedCallId(newCallId);

      // Create the call
      await createCall(newCallId);

      // Navigate to the call page
      router.push(`/video/call/${newCallId}`);
    } catch (err: any) {
      console.error("Error creating meeting:", err);
      setError(err.message || "Failed to create meeting");
      setIsCreating(false);
    }
  };

  const handleJoinMeeting = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!callId.trim()) {
      setError("Please enter a meeting ID");
      return;
    }

    try {
      setError(null);
      setIsJoining(true);

      // Join the call
      await joinCall(callId);

      // Navigate to the call page
      router.push(`/video/call/${callId}`);
    } catch (err: any) {
      console.error("Error joining meeting:", err);
      setError(
        err.message ||
          "Failed to join meeting. The meeting ID may be invalid or the meeting has ended."
      );
      setIsJoining(false);
    }
  };

  const copyMeetingLink = () => {
    if (!createdCallId) return;

    const meetingLink = `${window.location.origin}/video/call/${createdCallId}`;
    navigator.clipboard.writeText(meetingLink);
    alert("Meeting link copied to clipboard!");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
        <p className="mb-4">Please sign in to create or join a video call.</p>
        <button
          onClick={() => router.push("/auth")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Sign In
        </button>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Connection Error
        </h2>
        <p className="mb-4">
          Failed to connect to Stream. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Video Meetings</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {createdCallId && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <h3 className="font-semibold text-green-800 mb-2">
            Meeting Created!
          </h3>
          <p className="mb-2">
            Meeting ID:{" "}
            <span className="font-mono font-bold">{createdCallId}</span>
          </p>
          <p className="mb-3 text-sm">
            Share this ID with others so they can join your meeting.
          </p>
          <button
            onClick={copyMeetingLink}
            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
          >
            Copy Meeting Link
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Create a New Meeting</h3>
          <p className="mb-4 text-gray-600">
            Start a new video meeting and invite others to join.
          </p>
          <button
            onClick={handleCreateMeeting}
            disabled={isCreating}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isCreating ? "Creating..." : "Create Meeting"}
          </button>
        </div>

        <div className="flex-1 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Join a Meeting</h3>
          <form onSubmit={handleJoinMeeting}>
            <div className="mb-4">
              <label
                htmlFor="callId"
                className="block text-sm font-medium mb-1"
              >
                Meeting ID
              </label>
              <input
                id="callId"
                type="text"
                value={callId}
                onChange={(e) => setCallId(e.target.value)}
                placeholder="Enter meeting ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isJoining || !callId.trim()}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {isJoining ? "Joining..." : "Join Meeting"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
