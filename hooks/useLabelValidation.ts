import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { GitHubLabel, LabelOption } from "@/types/types";

export function useLabelValidation() {
  const [isValidating, setIsValidating] = useState(false);
  const [validated, setValidated] = useState(false);

  const validateLabels = useCallback(
    async (accessToken: string, repo: string, labels: LabelOption[]) => {
      if (!repo || labels.length === 0) {
        toast.error("Please select a repository and add labels first");
        return false;
      }

      setIsValidating(true);
      try {
        const [owner, repoName] = repo.split("/");
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repoName}/labels`,
          { headers: { Authorization: `token ${accessToken}` } }
        );

        const repoLabels: GitHubLabel[] = response.data;
        const repoLabelNames = repoLabels.map((label) => label.name.toLowerCase());
        const invalidLabels = labels.filter(
          (label) => !repoLabelNames.includes(label.label.toLowerCase())
        );

        if (invalidLabels.length > 0) {
          const invalidLabelNames = invalidLabels.map((label) => label.label).join(", ");
          toast.error(
            invalidLabels.length === labels.length
              ? "None of the selected labels exist in this repository"
              : "Some labels don't exist in this repository",
            { description: `Labels not found: ${invalidLabelNames}` }
          );
          setValidated(false);
          return false;
        } else {
          toast.success("All labels validated successfully!", {
            description: "You can now watch this repository",
          });
          setValidated(true);
          return true;
        }
      } catch (error) {
        console.error("Error validating labels:", error);
        toast.error("Failed to validate labels", {
          description: "Please check if the repository exists and you have access",
        });
        setValidated(false);
        return false;
      } finally {
        setIsValidating(false);
      }
    },
    []
  );

  return { validateLabels, isValidating, validated, setValidated };
}
