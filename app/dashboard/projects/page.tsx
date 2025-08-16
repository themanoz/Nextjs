"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { DiscordConnect } from "@/components/DiscordConnect";
import { WatchRepo } from "@/components/WatchRepo";
import { Repo } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  MoreHorizontal,
  FolderGit2,
  CircleDot,
  BellDot,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { toast } from "sonner";

// GitHub label color mapping
const getLabelColor = (label: string): string => {
  const labelColors: { [key: string]: string } = {
    bug: "bg-red-100 text-red-700 border border-red-200",
    "good first issue": "bg-purple-100 text-purple-700 border border-purple-200",
    enhancement: "bg-blue-100 text-blue-700 border border-blue-200",
    documentation: "bg-green-100 text-green-700 border border-green-200",
    help: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    question: "bg-orange-100 text-orange-700 border border-orange-200",
    invalid: "bg-gray-100 text-gray-700 border border-gray-200",
    wontfix: "bg-gray-100 text-gray-600 border border-gray-200",
    duplicate: "bg-gray-100 text-gray-600 border border-gray-200",
    "help wanted": "bg-green-100 text-green-600 border border-green-200",
    feature: "bg-blue-100 text-blue-600 border border-blue-200",
    "high priority": "bg-red-100 text-red-800 border border-red-200",
    "low priority": "bg-gray-100 text-gray-700 border border-gray-200",
    "medium priority": "bg-yellow-100 text-yellow-700 border border-yellow-200",
    security: "bg-red-100 text-red-800 border border-red-200",
    performance: "bg-purple-100 text-purple-800 border border-purple-200",
    refactor: "bg-indigo-100 text-indigo-700 border border-indigo-200",
    test: "bg-teal-100 text-teal-700 border border-teal-200",
    chore: "bg-gray-100 text-gray-600 border border-gray-200",
    design: "bg-pink-100 text-pink-700 border border-pink-200",
    accessibility: "bg-green-100 text-green-800 border border-green-200",
    mobile: "bg-blue-100 text-blue-800 border border-blue-200",
    web: "bg-cyan-100 text-cyan-700 border border-cyan-200",
    api: "bg-violet-100 text-violet-700 border border-violet-200",
    database: "bg-amber-100 text-amber-700 border border-amber-200",
    ui: "bg-rose-100 text-rose-700 border border-rose-200",
    ux: "bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200",
  };

  const normalizedLabel = label.toLowerCase().trim();
  return labelColors[normalizedLabel] || "bg-gray-200 text-gray-700 border border-gray-200";
};

export default function WatchedReposPage() {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [isBotInSharedGuild, setIsBotInSharedGuild] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  const discordId = session?.user?.discordId || null;

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await axios.get("/api/projects");
        setRepos(response.data.repositories || []);
        console.log(response.data.repositories);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };
    fetchRepositories();
  }, []);

  const handleBotStatusChecked = useCallback((status: boolean) => {
    setIsBotInSharedGuild(status);
  }, []);

  const handleDeleteRepo = useCallback(async (projectId: string) => {
    try {
      await axios.delete(`/api/projects?projectId=${projectId}`);
      
      // Remove the repo from the local state
      setRepos(prevRepos => prevRepos.filter(repo => repo.projectId !== projectId));
      
      // Close the modal if it's open
      setSelectedRepo(null);
      
      toast.success("Repository removed from watchlist successfully");
    } catch (error) {
      console.error("Error removing repository:", error);
      toast.error("Failed to remove repository from watchlist");
    }
  }, []);

  const filteredRepos = repos.filter(
    (repo) =>
      repo.repo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">
            Watched Repositories
          </h1>
          <p className="text-sm text-neutral-400">
            Manage and monitor your watched GitHub repositories
          </p>
        </div>
        <div className="flex gap-2">
          {!discordId || !isBotInSharedGuild ? (
            <DiscordConnect
              discordId={discordId}
              onBotStatusChecked={handleBotStatusChecked}
            />
          ) : (
            <WatchRepo setRepos={setRepos} />
          )}
          <Button>
            <Filter /> Filter
          </Button>
        </div>
      </div>

      {/* Search + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="lg:col-span-1 bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search repositories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-neutral-800 border-neutral-600 text-white placeholder-neutral-400"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-400 tracking-wider">
                TOTAL WATCHED REPOSITORIES
              </p>
              <p className="text-2xl font-bold text-white font-mono">
                {repos.length}
              </p>
            </div>
            <FolderGit2 className="w-8 h-8" />
          </CardContent>
        </Card>
        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-400 tracking-wider">
                ISSUES PINGED
              </p>
              <p className="text-2xl font-bold text-green-500 font-mono">
                {repos.filter((r) => r.full_name).length}
              </p>
            </div>
            <CircleDot className="w-8 h-8" />
          </CardContent>
        </Card>
        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-400 tracking-wider">
                NOTIFICATIONS SENT
              </p>
              <p className="text-2xl font-bold text-orange-500 font-mono">
                {repos.filter((r) => r.full_name).length}
              </p>
            </div>
            <BellDot className="w-8 h-8" />
          </CardContent>
        </Card>
      </div>

      {/* Repo List */}
      <Card className="bg-neutral-900 border-neutral-700">
        {/* <CardHeader>
          <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
            REPOSITORY LIST
          </CardTitle>
        </CardHeader> */}
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">
                    REPOSITORY
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">
                    OWNER
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">
                    LABELS
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">
                    LAST CHECKED
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRepos.map((repo, index) => (
                  <tr
                    key={repo.id ?? `${repo.owner}/${repo.repo}-${index}`}
                    className={`border-b border-neutral-800 hover:bg-neutral-800 transition-colors cursor-pointer ${
                      index % 2 === 0 ? "bg-neutral-900" : "bg-neutral-850"
                    }`}
                    onClick={() => setSelectedRepo(repo)}
                  >
                    <td className="py-3 px-4 text-sm text-white">
                      {repo.repo}
                    </td>
                    <td className="py-3 px-4 text-sm text-white">
                      {repo.owner}
                    </td>
                    <td className="py-3 px-4">
                      {Array.isArray(repo.labels)
                        ? repo.labels.map((label: string, i: number) => (
                            <Badge 
                              key={label.trim() + i} 
                              className={`mr-1 ${getLabelColor(label)}`}
                            >
                              {label.trim()}
                            </Badge>
                          ))
                        : typeof repo.labels === "string" && repo.labels
                        ? (repo.labels as string).split(",").map((label: string, i: number) => (
                            <Badge 
                              key={label.trim() + i} 
                              className={`mr-1 ${getLabelColor(label)}`}
                            >
                              {label.trim()}
                            </Badge>
                          ))
                        : null}
                    </td>
                    <td className="py-3 px-4 text-sm text-neutral-300 font-mono">
                      {new Date(repo.lastChecked).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-neutral-400 hover:text-orange-500"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Repo Detail Modal */}
      {selectedRepo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-neutral-900 border-neutral-700 w-full max-w-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-white tracking-wider">
                  {selectedRepo.repo}
                </CardTitle>
                <p className="text-sm text-neutral-400 font-mono">
                  {selectedRepo.owner}
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSelectedRepo(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-neutral-400 tracking-wider mb-1">
                    STATUS
                  </p>
                  <p className="text-sm text-white">Active</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-400 tracking-wider mb-1">
                    LAST CHECKED
                  </p>
                  <p className="text-sm text-white">
                    {new Date(selectedRepo.lastChecked).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-400 tracking-wider mb-1">
                    ISSUES PINGED
                  </p>
                  <p className="text-sm text-white">0</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-400 tracking-wider mb-1">
                    LABELS
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(selectedRepo.labels)
                      ? selectedRepo.labels.map((label: string, i: number) => (
                          <Badge 
                            key={label.trim() + i} 
                            className={getLabelColor(label)}
                          >
                            {label.trim()}
                          </Badge>
                        ))
                      : typeof selectedRepo.labels === "string" && selectedRepo.labels
                      ? (selectedRepo.labels as string).split(",").map((label: string, i: number) => (
                          <Badge 
                            key={label.trim() + i} 
                            className={getLabelColor(label)}
                          >
                            {label.trim()}
                          </Badge>
                        ))
                      : null}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  <Link href="#">GitHub</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                >
                  Update Labels
                </Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                  onClick={() => handleDeleteRepo(selectedRepo.projectId)}
                >
                  Remove from Watchlist
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
