import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);

  try {
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "",
      client_secret: process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET || "",
      grant_type: "authorization_code",
      code: code.toString(),
      // redirect_uri: "http://localhost:3000/api/discord",
      redirect_uri: "https://gittrek.com/api/discord",
    });

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/x-www-form-urlencoded",
    };

    const response = await axios.post(
      `https://discord.com/api/oauth2/token`,
      params,
      { headers }
    );

    const accessToken = response.data.access_token;

    const userInfo = await axios.get("https://discord.com/api/v10/users/@me", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const discordUserInfo = {
      id: userInfo.data.id,
      username: userInfo.data.username,
      avatar: userInfo.data.avatar,
      email: userInfo.data.email,
      global_name: userInfo.data.global_name,
    };

    try {
      await prisma.user.update({
        where: { id: session?.user.id },
        data: {
          discordId: discordUserInfo.id,
          discordUsername: discordUserInfo.username,
          discordAvatar: discordUserInfo.avatar,
        },
      });
    } catch (err) {
      const error = err as AxiosError;

      console.error(
        "Error saving discord data",
        error.response?.data || error.message
      );
      return NextResponse.json(
        { error: "Failed to connect Discord" },
        { status: 500 }
      );
    }

    return NextResponse.redirect(new URL("/dashboard/projects", req.url));
  } catch (err) {
    const error = err as AxiosError;

    console.error(
      "Error in Discord auth:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
