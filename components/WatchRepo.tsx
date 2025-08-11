"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { GithubIcon, Loader2, AlertCircle, Check } from "lucide-react";
import { MultiSelect } from "@/components/MultiSelect";
import { PREDEFINED_LABELS } from "@/constants/labels";
import { useGithubRepoSearch } from "@/hooks/useGithubRepoSearch";
import { useLabelValidation } from "@/hooks/useLabelValidation";
import { toast } from "sonner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Repo, LabelOption } from "@/types/types";

interface Props {
  setRepos: (repos: Repo[]) => void;
}

export function WatchRepo({ setRepos }: Props) {
  const { data: session } = useSession();
  const [credenzaOpen, setCredenzaOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchRepo, setSearchRepo] = useState("");
  const [selectedRepo, setSelectedRepo] = useState("");
  const [labels, setLabels] = useState<LabelOption[]>([]);
  const [isWatching, setIsWatching] = useState(false);

  const { fetchedRepos, searchGithubRepos } = useGithubRepoSearch();
  const { validateLabels, isValidating, validated, setValidated } = useLabelValidation();

  const canWatch = selectedRepo && labels.length > 0 && validated;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchRepo && session?.accessToken) {
        searchGithubRepos(session.accessToken, searchRepo);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchRepo, searchGithubRepos, session?.accessToken]);

  const handleWatchRepo = useCallback(async () => {
    console.log("handleWatchRepo called");
    if (!validated) {
      toast.error("Please validate labels first");
      return;
    }

    setIsWatching(true);
    try {
      const labelStrings = labels.map((label) => label.label);
      await axios.post("/api/projects", { selectedRepo, labels: labelStrings });

      toast.success("Repository added to watchlist!", {
        description: `Now watching ${selectedRepo} for selected labels`,
      });

      setSelectedRepo("");
      setLabels([]);
      setValidated(false);
      setCredenzaOpen(false);

      const response = await axios.get("/api/projects");
      setRepos(response.data.repositories);
    } catch (error) {
      console.error("Error adding repository to watchlist:", error);
      toast.error("Failed to add repository to watchlist");
    } finally {
      setIsWatching(false);
    }
  }, [validated, labels, selectedRepo, setRepos, setValidated]);

  return (
    <Credenza open={credenzaOpen} onOpenChange={setCredenzaOpen}>
      <CredenzaTrigger asChild>
        <Button className="w-full sm:w-auto">Watch Repository</Button>
      </CredenzaTrigger>
      <CredenzaContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <CredenzaHeader>
          <CredenzaTitle>Add New Repository</CredenzaTitle>
          <CredenzaDescription>
            Select a repository and choose labels to watch for new issues.
          </CredenzaDescription>
        </CredenzaHeader>

        <CredenzaBody className="space-y-6">

          <div className="space-y-2">
            <label className="text-sm font-medium">Repository</label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-start gap-2"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span className="truncate">
                    {selectedRepo || "Select Repository"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[620px] p-0 popover-content-width">
                <Command>
                  <CommandInput
                    placeholder="Search repository..."
                    className="h-9"
                    value={searchRepo}
                    onValueChange={setSearchRepo}
                  />
                  <CommandList>
                    <CommandEmpty>No repositories found.</CommandEmpty>
                    <CommandGroup>
                      {fetchedRepos.map((repo: string) => (
                        <CommandItem
                          key={repo}
                          value={repo}
                          onSelect={() => {
                            setSelectedRepo(repo);
                            setValidated(false);
                            setOpen(false);
                          }}
                          className="cursor-pointer"
                        >
                          <GithubIcon className="h-4 w-4 mr-2" />
                          <span className="truncate">{repo}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Issue Labels to Watch</label>
            <MultiSelect
              options={PREDEFINED_LABELS}
              value={labels}
              onChange={(newLabels) => {
                setLabels(newLabels);
                setValidated(false);
              }}
              placeholder="Choose issue labels to watch"
            />
            <p className="text-xs text-muted-foreground">
              You can select from predefined labels or type custom ones
            </p>
          </div>

 
          {selectedRepo && labels.length > 0 && (
            <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Label Validation</span>
                {validated && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="h-4 w-4" />
                    <span className="text-xs">Validated</span>
                  </div>
                )}
              </div>

              <Button
                onClick={async () => {
                  if (session?.accessToken) {
                    await validateLabels(
                      session.accessToken,
                      selectedRepo,
                      labels
                    );
                  }
                }}
                disabled={isValidating || validated}
                variant={validated ? "secondary" : "default"}
                size="sm"
                className="w-full"
              >
                {isValidating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Validating Labels...
                  </>
                ) : validated ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Labels Validated
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Validate Labels
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground">
                This checks if the selected labels exist in the repository
              </p>
            </div>
          )}
        </CredenzaBody>

        <CredenzaFooter className="flex flex-col sm:flex-row gap-2">
          <CredenzaClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Cancel
            </Button>
          </CredenzaClose>
          <Button
            onClick={handleWatchRepo}
            disabled={!canWatch || isWatching}
            className="w-full sm:w-auto"
          >
            {isWatching ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Adding...
              </>
            ) : (
              "Watch Repository"
            )}
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
