import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export function useGithubRepoSearch() {
  const [fetchedRepos, setFetchedRepos] = useState<string[]>([]);

  const searchGithubRepos = useCallback(
    async (accessToken: string, repo: string) => {
      if (!repo) {
        setFetchedRepos([]);
        return;
      }
      try {
        const response = await axios.get(
          `https://api.github.com/search/repositories?q=${repo}`,
          { headers: { Authorization: `token ${accessToken}` } }
        );
        const repoNames = response.data.items.map((item: any) => item.full_name);
        setFetchedRepos(repoNames);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        toast.error("Failed to search repositories");
      }
    },
    []
  );

  return { fetchedRepos, searchGithubRepos };
}
