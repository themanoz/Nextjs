"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

interface DiscordConnectProps {
  discordId: string | null;
  onBotStatusChecked: (isBotInSharedGuild: boolean) => void;
}

export function DiscordConnect({
  discordId,
  onBotStatusChecked,
}: DiscordConnectProps) {
  const [isBotInSharedGuild, setIsBotInSharedGuild] = useState(false);

  const checkBotGuildStatus = useCallback(async () => {
    if (discordId) {
      try {
        const response = await axios.get("/api/discord/guild-status");
        const { isBotInSharedGuild: status } = response.data;
        console.log("Bot guild status:", status);
        setIsBotInSharedGuild(status);
        onBotStatusChecked(status);
      } catch (error) {
        console.error("Error checking bot guild status:", error);
        setIsBotInSharedGuild(false);
        onBotStatusChecked(false);
      } finally {
      }
    } else {
      setIsBotInSharedGuild(false);
      onBotStatusChecked(false);
    }
  }, [discordId]);

  useEffect(() => {
    checkBotGuildStatus();
  }, [checkBotGuildStatus]);

  const connectToDiscord = () => {
    window.open(
      // `https://discord.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fdiscord&scope=identify+email`,
      `https://discord.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&&response_type=code&redirect_uri=https%3A%2F%2Fgittrek.com%2Fapi%2Fdiscord&scope=email+identify`
    );
  };

  const inviteBot = () => {
    window.open(
      `https://discord.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&permissions=75776&integration_type=0&scope=bot`,
      "_blank"
    );
  };

  if (!discordId) {
    return (
      <Button className="w-full sm:w-auto" onClick={connectToDiscord}>
        Connect Discord
      </Button>
    );
  }

  if (!isBotInSharedGuild) {
    return (
      <div className="space-y-2">
        <Button className="w-full sm:w-auto" onClick={inviteBot}>
          Invite Bot
        </Button>
      </div>
    );
  }

  return null;
}
