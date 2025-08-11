import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

interface PullRequest {
  closedAt: string;
  title: string;
  url: string;
  repository: {
    name: string;
    owner: {
      login: string;
      avatarUrl: string;
    };
  };
}

interface Viewer {
  login: string;
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
      weeks: Array<{
        contributionDays: Array<{
          date: string;
          contributionCount: number;
        }>;
      }>;
    };
    commitContributionsByRepository: Array<{
      repository: {
        name: string;
      };
      contributions: {
        totalCount: number;
      };
    }>;
    pullRequestContributions: {
      totalCount: number;
    };
    issueContributions: {
      totalCount: number;
    };
  };
  pullRequests: {
    nodes: PullRequest[];
  };
}

interface GitHubResponse {
  data: {
    viewer: Viewer;
  };
  errors?: Array<{message: string}>;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const accessToken = session.accessToken;

    // The updated GraphQL query includes merged pull request details
    const query = `
      query {
        viewer {
          login
          contributionsCollection {
            # Total contributions over the period
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
            # Commits grouped by repository
            commitContributionsByRepository(maxRepositories: 100) {
              repository {
                name
              }
              contributions {
                totalCount
              }
            }
            # Total pull request contributions
            pullRequestContributions {
              totalCount
            }
            # Total issue contributions
            issueContributions {
              totalCount
            }
          }
          pullRequests(first: 100, states: MERGED) {
            nodes {
              closedAt
              title
              url
              repository {
                name
                owner {
                  login
                  avatarUrl
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const json: GitHubResponse = await response.json();

    if (json.errors) {
      return NextResponse.json({ error: json.errors }, { status: 500 });
    }

    const viewer = json.data.viewer;

    const dailyContributions =
      viewer.contributionsCollection.contributionCalendar.weeks.flatMap(
        (week) =>
          week.contributionDays.map((day) => ({
            date: day.date,
            commits: day.contributionCount,
          }))
      );

    const todayDate = new Date().toISOString().split("T")[0];
    const todayEntry = dailyContributions.find((day) => day.date === todayDate);
    const currentDayCommits = todayEntry ? todayEntry.commits : 0;

    const stats = {
      login: viewer.login,
      totalContributions:
        viewer.contributionsCollection.contributionCalendar.totalContributions,
      commitContributions: viewer.contributionsCollection.commitContributionsByRepository.map(
        (item) => ({
          repositoryName: item.repository.name,
          totalCommits: item.contributions.totalCount,
        })
      ),
      pullRequestContributions:
        viewer.contributionsCollection.pullRequestContributions.totalCount,
      issueContributions:
        viewer.contributionsCollection.issueContributions.totalCount,
    };

    const mergedPullRequests = viewer.pullRequests.nodes;
    // console.log("prs: ",mergedPullRequests);

    return NextResponse.json(
      { stats, currentDayCommits, dailyContributions, mergedPullRequests },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}
