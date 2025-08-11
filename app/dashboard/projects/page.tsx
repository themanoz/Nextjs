"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { DataTableDemo } from "@/components/data-table";
import { DiscordConnect } from "@/components/DiscordConnect";
import { WatchRepo } from "@/components/WatchRepo";
import { Repo } from "@/types/types";

function Page() {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [isBotInSharedGuild, setIsBotInSharedGuild] = useState(false);

  const discordId = session?.user?.discordId || null;

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await axios.get("/api/projects");
        setRepos(response.data.repositories);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };
    fetchRepositories();
  }, []);

  const handleBotStatusChecked = useCallback((status: boolean) => {
    setIsBotInSharedGuild(status);
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <main className="py-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
          <div className="space-y-1">
            <h2 className="font-semibold text-xl sm:text-2xl">
              Watched Repositories
            </h2>
            <p className="text-sm sm:text-base font-normal text-muted-foreground">
              List of your watched repositories
            </p>
          </div>

          {/* Unified DiscordConnect logic */}
          {!discordId || !isBotInSharedGuild ? (
            <DiscordConnect
              discordId={discordId}
              onBotStatusChecked={handleBotStatusChecked}
            />
          ) : (
            <WatchRepo setRepos={setRepos} />
          )}
        </div>

        <div className="mt-6">
          <DataTableDemo repos={repos} />
        </div>
      </main>
    </div>
  );
}

export default Page;