import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    user: {
      id: string;
      username?: string;
      discordAccessToken: string;
      discordUsername: string;
      discordId: string;
      discordAvatar: string;
      // Only allow these specific values for subscription status.
      subscriptionStatus?: "TRIAL" | "ACTIVE" | "EXPIRED" | "CANCELED";
      trialEndDate?: string | null | Date;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    id?: string;
    username?: string;
    subscriptionStatus?: "TRIAL" | "ACTIVE" | "EXPIRED" | "CANCELED";
    trialEndDate?: string | null;
  }
}
