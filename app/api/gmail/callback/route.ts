import { google } from "googleapis";
import { NextResponse } from "next/server";
import db from "@/db";
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXTAUTH_URL}/api/gmail/callback`
);
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const encodedState = searchParams.get("state");

  if (!code || !encodedState) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    // Decode state data
    const stateJson = Buffer.from(encodedState, "base64").toString();
    const { zapId, userId } = JSON.parse(stateJson);

    // Verify zap belongs to user
    const zap = await db.zap.findFirst({
      where: {
        id: zapId,
        userId: userId,
      },
    });

    if (!zap) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tokens } = await oauth2Client.getToken(code);

    // Save tokens to database
    await db.token.upsert({
      where: {
        zapId: zapId,
      },
      update: {
        provider: "gmail",
        accessToken: tokens.access_token!,
        refreshToken: tokens.refresh_token,
        expiresAt: new Date(Date.now() + (tokens.expiry_date || 3600000)),
      },
      create: {
        zapId: zapId,
        provider: "gmail",
        accessToken: tokens.access_token!,
        refreshToken: tokens.refresh_token,
        expiresAt: new Date(Date.now() + (tokens.expiry_date || 3600000)),
      },
    });

    // Update zap status
    await db.zap.update({
      where: { id: zapId },
      data: { status: "active" },
    });

    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth-success`);
  } catch (error) {
    console.error("Failed to get tokens:", error);
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth-error`);
  }
}
