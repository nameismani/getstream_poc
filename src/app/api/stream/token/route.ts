import { NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/db";
import crypto from "crypto";
import { cookies } from "next/headers";

// Generate a Stream token for a user
function generateStreamToken(userId: string, apiSecret: string) {
  // Create the JWT payload
  const jwtPayload = {
    user_id: userId,
    server: false, // This is a user token, not a server token
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
    // In a real app, you would verify the session and get the user ID
    // For this example, we'll extract the user ID from the request
    const authHeader = request.headers.get("authorization");
    let userId;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      // Extract user ID from the token (in a real app, you would verify the token)
      userId = authHeader.substring(7);
    } else {
      // Fallback to query parameter
      const url = new URL(request.url);
      userId = url.searchParams.get("user_id");
    }

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    // Connect to database
    await dbConnect();

    // Find the user in the database
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
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
