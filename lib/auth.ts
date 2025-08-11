import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {prisma} from "@/lib/prisma"
import type { JWT } from "next-auth/jwt";

interface GitHubProfile {
  id: string;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
  username: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: { params: { scope: "read:user user:email public_repo" } },
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }
      if (account && profile) {
        const githubProfile = profile as GitHubProfile;
        token.accessToken = account.access_token;
        token.username = githubProfile.login;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (token && session.user) {
        session.accessToken = token.accessToken;
        session.user.id = token.id as string;
        session.user.username = token.username as string;

        const discord = await prisma.user.findUnique({
          where: { id: session.user.id },
          select: {
            discordId: true,
            isBotInSharedGuild: true
          },
        });

        session.user.discordId = discord?.discordId as string;
        // session.user.isBotInSharedGuild = discord?.isBotInSharedGuild || false;
 
        const subscription = await prisma.subscription.findFirst({
          where: { userId: token.id as string },
          orderBy: { createdAt: "desc" },
        });

        session.user.subscriptionStatus = subscription?.status;
        session.user.trialEndDate = subscription?.trialEnd;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
