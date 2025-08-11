// app/watched-repositories/page.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface WatchedRepo {
  id: string;
  fullName: string;
  labels: string[];
  addedAt: string;
}

export default function WatchedRepositories() {
  const [watchedRepos, setWatchedRepos] = useState<WatchedRepo[]>([]);

  useEffect(() => {
    async function fetchWatchedRepos() {
      try {
        const response = await axios.get("/api/watched-repositories"); // API to fetch user watchlist
        setWatchedRepos(response.data);
      } catch (error) {
        console.error("Error fetching watched repositories:", error);
      }
    }

    fetchWatchedRepos();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Watched Repositories</h1>
      <table className="min-w-full text-white shadow-md rounded-lg overflow-hidden">
        <thead className="text-gray-100">
          <tr>
            <th className="text-left p-3">Repository</th>
            <th className="text-left p-3">Labels</th>
            <th className="text-left p-3">Watching Since</th>
          </tr>
        </thead>
        <tbody>
          {watchedRepos.map((repo) => (
            <tr key={repo.id} className="border-b">
              <td className="p-3">{repo.fullName}</td>
              <td className="p-3">{repo.labels.join(", ")}</td>
              <td className="p-3">{new Date(repo.addedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
