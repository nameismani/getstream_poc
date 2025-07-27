"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { StreamVideoClient, Call } from "@stream-io/video-react-sdk";
import { useAuth } from "./AuthContext";

type StreamContextType = {
  client: StreamVideoClient | null;
  isLoading: boolean;
  error: string | null;
  createCall: (callId: string) => Promise<Call>;
  joinCall: (callId: string) => Promise<Call>;
};

const StreamContext = createContext<StreamContextType | undefined>(undefined);

export function StreamProvider({ children }: { children: ReactNode }) {
  const { user: authUser } = useAuth();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeStreamClient = async () => {
      if (!authUser) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Get the Stream API key from environment variables
        const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
        if (!apiKey) {
          throw new Error("Stream API key is not defined");
        }

        // Get token from our API
        const response = await fetch(
          `/api/stream/token?user_id=${authUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${authUser.id}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to get Stream token");
        }

        const { token } = await response.json();

        if (!token) {
          throw new Error("Failed to get Stream token");
        }

        // Initialize Stream client with user data
        const streamClient = new StreamVideoClient({
          apiKey,
          user: {
            id: authUser.id,
            name: authUser.name || "User",
            image: `https://getstream.io/random_svg/?id=${authUser.id}&name=${
              authUser.name || "User"
            }`,
          },
          token,
        });

        setClient(streamClient);
      } catch (err: any) {
        console.error("Error initializing Stream client:", err);
        setError(err.message || "Failed to initialize Stream client");
      } finally {
        setIsLoading(false);
      }
    };

    initializeStreamClient();

    // Cleanup function
    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, [authUser]);

  // Function to create a new call
  const createCall = async (callId: string): Promise<Call> => {
    if (!client) {
      throw new Error("Stream client not initialized");
    }

    try {
      const call = client.call("default", callId);

      // Join the call with create flag
      await call.join({ create: true });

      return call;
    } catch (error) {
      console.error("Error creating call:", error);
      throw error;
    }
  };

  // Function to join an existing call
  const joinCall = async (callId: string): Promise<Call> => {
    if (!client) {
      throw new Error("Stream client not initialized");
    }

    try {
      const call = client.call("default", callId);

      // Join the call
      await call.join();

      return call;
    } catch (error) {
      console.error("Error joining call:", error);
      throw error;
    }
  };

  return (
    <StreamContext.Provider
      value={{ client, isLoading, error, createCall, joinCall }}
    >
      {children}
    </StreamContext.Provider>
  );
}

export function useStream() {
  const context = useContext(StreamContext);
  if (context === undefined) {
    throw new Error("useStream must be used within a StreamProvider");
  }
  return context;
}
