import { NextResponse } from "next/server";
import axios from "axios";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendDirectMessage } from "@/lib/discord";

interface DiscordGuild {
  id: string;
  name: string;
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.discordId) {
    return NextResponse.json(
      { error: "User not authenticated or Discord not connected" },
      { status: 401 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        discordId: true,
        isBotInSharedGuild: true,
        hasReceivedGreeting: true,
      },
    });

    if (!user?.discordId) {
      return NextResponse.json(
        { error: "Discord ID not found for user." },
        { status: 404 }
      );
    }

    // ✅ If already checked and stored, return early
    if (user.isBotInSharedGuild && user.hasReceivedGreeting) {
      return NextResponse.json(
        {
          isBotInSharedGuild: true,
          greeted: true,
          message: "Bot already invited and greeting sent.",
        },
        { status: 200 }
      );
    }

    // ❗ Only proceed if not previously checked or greeting not sent
    const botAccessToken = process.env.DISCORD_BOT_TOKEN;
    if (!botAccessToken) {
      console.error("Missing DISCORD_BOT_TOKEN");
      return NextResponse.json(
        { error: "Bot not configured" },
        { status: 500 }
      );
    }

    const botGuildsResponse = await axios.get<DiscordGuild[]>(
      "https://discord.com/api/users/@me/guilds",
      {
        headers: { Authorization: `Bot ${botAccessToken}` },
      }
    );

    const botGuildIds = new Set(botGuildsResponse.data.map((g) => g.id));
    const isBotInSharedGuild = botGuildIds.size > 0;

    // ✅ Update user with guild status (only if changed)
    await prisma.user.update({
      where: { id: session.user.id },
      data: { isBotInSharedGuild },
    });

    if (isBotInSharedGuild && !user.hasReceivedGreeting) {
      try {
        await sendDirectMessage(
          user.discordId,
          "👋 Hello! Thanks for connecting with GitTrek. I’ll notify you via DMs when new GitHub issues arrive."
        );

        await prisma.user.update({
          where: { id: session.user.id },
          data: { hasReceivedGreeting: true },
        });

        return NextResponse.json(
          {
            isBotInSharedGuild: true,
            greeted: true,
            message: "Greeting sent successfully.",
          },
          { status: 200 }
        );
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const isDMBlocked = err.response?.status === 403;
          const errorMsg = isDMBlocked
            ? "We couldn't send you a DM. Please allow DMs from server members and ensure you're in a shared server with the bot."
            : "Failed to send DM due to an unexpected error.";
          console.error(errorMsg);
          return NextResponse.json(
            {
              isBotInSharedGuild: true,
              greeted: false,
              warning: errorMsg,
            },
            { status: 200 }
          );
        } else {
          console.error("An unknown error occurred while sending DM.");
        }
      }
    }

    return NextResponse.json(
      {
        isBotInSharedGuild,
        greeted: user.hasReceivedGreeting,
        message: isBotInSharedGuild
          ? "Bot is in a shared server but greeting already sent."
          : "Bot not in any shared servers.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in guild-status route:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
