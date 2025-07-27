import { NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/db";
import crypto from "crypto";

// Helper function to get the authenticated user from the session
async function getAuthenticatedUser(request: Request) {
  // In a real application, you would validate the session/token here
  // For this example, we'll extract user info from a cookie or header

  // Get user ID from cookies or headers
  const userId = request.headers.get("x-user-id");

  if (!userId) {
    return null;
  }

  // Connect to database
  await dbConnect();

  // Fetch user from database
  const user = await User.findById(userId);
  return user;
}

// Generate a Stream token for a user
function generateStreamToken(userId: string, apiSecret: string) {
  // Create the JWT payload
  const jwtPayload = {
    user_id: userId,
  };

  // Add issued at and expiration times
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    ...jwtPayload,
    iat: now,
    exp: now + 60 * 60 * 24 * 30, // 30 days expiration
  };

  // Convert the payload to base64
  const encodedPayload = Buffer.from(JSON.stringify(payload))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  // Create the JWT header
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  // Convert the header to base64
  const encodedHeader = Buffer.from(JSON.stringify(header))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  // Create the content to sign
  const signatureContent = `${encodedHeader}.${encodedPayload}`;

  // Create the signature
  const signature = crypto
    .createHmac("sha256", apiSecret)
    .update(signatureContent)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  // Return the complete JWT token
  return `${signatureContent}.${signature}`;
}

export async function GET(request: Request) {
  try {
    // Get authenticated user
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get Stream API secret from environment variables
    const apiSecret = process.env.STREAM_SECRET_KEY;

    if (!apiSecret) {
      return NextResponse.json(
        { error: "Stream API configuration missing" },
        { status: 500 }
      );
    }

    // Generate a token for the user
    const token = generateStreamToken(user.id, apiSecret);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error generating Stream token:", error);
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    );
  }
}
