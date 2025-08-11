import axios from "axios";

const DISCORD_API_BASE_URL = "https://discord.com/api/v10";

export async function sendDirectMessage(
  discordUserId: string,
  message: string
) {
  try {
    const botToken = process.env.DISCORD_BOT_TOKEN;

    if (!botToken) throw new Error("Bot token not configured");

    console.log(`Attempting to send DM to Discord User ID: ${discordUserId}`);

    const dmChannelResponse = await axios.post(
      `${DISCORD_API_BASE_URL}/users/@me/channels`,
      { recipient_id: discordUserId },
      { headers: { Authorization: `Bot ${botToken}` } }
    );

    const dmChannelId = dmChannelResponse.data.id;
    console.log(`DM Channel ID: ${dmChannelId}`);

    // Send message to DM channel
    await axios.post(
      `${DISCORD_API_BASE_URL}/channels/${dmChannelId}/messages`,
      { content: message },
      { headers: { Authorization: `Bot ${botToken}` } }
    );

    console.log(`✅ Sent DM`);
    return dmChannelId;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("❌ Failed to send DM:", err.response?.data || err.message);
    } else if (err instanceof Error) {
      console.error("❌ Failed to send DM:", err.message);
    } else {
      console.error("❌ Failed to send DM: Unknown error type");
    }
    throw err;
  }
}
