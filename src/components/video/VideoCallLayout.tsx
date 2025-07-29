"use client";

import {
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  StreamTheme,
  SpeakerLayout,
  CallControls,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface VideoCallLayoutProps {
  callId: string;
  client: StreamVideoClient;
}

export default function VideoCallLayout({
  callId,
  client,
}: VideoCallLayoutProps) {
  const [call, setCall] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const setupCall = async () => {
      try {
        // Create a call instance
        const newCall = client.call("default", callId);

        try {
          // Try to get the call first to check if it exists
          await newCall.get();

          // If the call exists, join it
          await newCall.join();
        } catch (err) {
          // If the call doesn't exist, create and join it
          await newCall.join({ create: true });
        }

        setCall(newCall);
      } catch (err: any) {
        console.error("Error joining call:", err);
        setError(err.message || "Failed to join call");
      }
    };

    if (client && callId) {
      setupCall();
    }

    return () => {
      if (call) {
        // Leave the call when component unmounts
        call.leave().catch((err: any) => {
          console.error("Error leaving call:", err);
        });
      }
    };
  }, [client, callId]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="mb-4">{error}</p>
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

  if (!call) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3">Joining call...</p>
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUI />
      </StreamCall>
    </StreamVideo>
  );
}

function CallUI() {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3">Connecting to call...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 relative">
        <StreamTheme>
          <SpeakerLayout participantsBarPosition="bottom" />
          <div className="grid grid-cols-[10fr_2fr] ">
            <div>
              <CallControls onLeave={() => router.push("/video")} />
            </div>
            <div className="self-center" >
              speaker
            </div>
          </div>
        </StreamTheme>
      </div>
    </div>
  );
}
