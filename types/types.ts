import { JSX } from "react";

export interface QueryParams {
  id: string;
  name: string;
  full_name: string;
  owner: string;
  url: string;
}

export interface Repo {
  id: string;
  projectId: string;
  full_name: string;
  repo: string;
  owner: string;
  labels?: string[];
  lastChecked: string;
}

export interface GitHubLabel {
  name: string;
  color: string;
  description?: string;
}

export interface LabelOption {
  value: string;
  label: string;
  colorClass?: string;
}
export interface Stats {
  map(arg0: (stat: any, index: any) => JSX.Element): import("react").ReactNode;
  login: string;
  totalContributions: number;
  commitContributions: {
    repositoryName: string;
    totalCommits: number;
  }[];
  pullRequestContributions: number;
  issueContributions: number;
}

export interface DailyContribution {
  date: string;
  commits: number;
}

export interface GitHubData {
  stats: Stats;
  dailyContributions: DailyContribution[];
  currentDayCommits: number;
  mergedPullRequests: prData[]
}
export interface prData {
  closedAt: Date;
  title: string;
  url: string
}

export const currentDate = new Date();
export const defaultMonth = currentDate.getMonth(); // 0-indexed: January is 0
export const defaultYear = currentDate.getFullYear();

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export interface ContributionDay {
  date: string;
  contributionCount: number;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface CommitContributionsByRepository {
  repository: {
    name: string;
  };
  contributions: {
    totalCount: number;
  };
}

export interface ContributionsCollection {
  contributionCalendar: ContributionCalendar;
  commitContributionsByRepository: CommitContributionsByRepository[];
  pullRequestContributions: {
    totalCount: number;
  };
  issueContributions: {
    totalCount: number;
  };
}

export interface Viewer {
  pullRequests: any;
  login: string;
  contributionsCollection: ContributionsCollection;
}

export interface GitHubResponse {
  data: {
    viewer: Viewer;
  };
  errors?: any;
}

export interface Project {
  id: string;
  name: string;
  full_name: string;
  owner: string;
  language: string;
  description: string;
  url: string;
  website: string;
  subscribers_count: number;
  avatar_url: string;
}

export interface ProjectProps {
  project: Project;
  issues: Issues[];
  labels: Labels[];
}

export interface Labels {
  name: string;
  description: string;
  color: string;
}

export interface Issues {
  id: number;
  title: string;
  html_url: string;
  number: number;
  created_at: string;
  labels: Labels[];
}

export interface Issue {
  id: number;
  title: string;
  html_url: string;
  number: number;
  created_at: string;
  labels: Labels[];
}

export interface GitHubPullRequestInfo {
  url: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  merged_at: string | null;
}

export interface GitHubIssue {
  title: string;
  url: string;
  labels: Labels[];
  pull_request?: GitHubPullRequestInfo;
}
