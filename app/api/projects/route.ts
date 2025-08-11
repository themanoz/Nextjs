import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { selectedRepo, labels } = body;

    const pathParts = selectedRepo.split("/");

    if (pathParts.length < 2) {
      return NextResponse.json(
        { message: "Invalid GitHub Repository name" },
        { status: 400 }
      );
    }

    const [owner, repo] = pathParts;
    const userId = session.user.id;

    // 1. Find existing project or create a new one
    let project;
    try {
      project = await prisma.project.upsert({
        where: { full_name: selectedRepo },
        update: {
          // You might update labels here if they can change per repo globally
          // or if you want to merge labels from different users.
          // For now, let's assume labels are specific to the user's "watch"
        },
        create: {
          repo: repo,
          full_name: selectedRepo,
          labels: labels, // Initial labels for the project
          owner: owner,
        },
      });
    } catch (error) {
      console.error("Error upserting repository:", error);
      return NextResponse.json(
        { error: "Database error during repository upsert" },
        { status: 500 }
      );
    }

    // 2. Connect the user to the project (if not already connected)
    try {
      await prisma.watchlist.upsert({
        where: { userId_projectId: { userId, projectId: project.id } },
        update: { labels },
        create: {
          userId,
          projectId: project.id,
          labels,
        },
      });

      console.log(`Successfully added repository to your watchlist!`);
      return NextResponse.json({ projectDetails: project }, { status: 200 });
    } catch (error) {
      console.error("Error adding repository to watchlist: ", error);
      return NextResponse.json(
        { error: "Could not associate user with repository" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unhandled error: ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch watchlist repositories for the logged-in user
    const watchlistEntries = await prisma.watchlist.findMany({
      where: { userId },
      select: {
        labels: true,
        project: {
          select: {
            id: true,
            repo: true,
            full_name: true,
            owner: true,
          },
        },
      },
    });

    // Structure the response neatly
    const repositories = watchlistEntries.map((entry) => ({
      projectId: entry.project.id,
      repo: entry.project.repo,
      full_name: entry.project.full_name,
      owner: entry.project.owner,
      labels: entry.labels,
    }));

    return NextResponse.json({ repositories }, { status: 200 });
  } catch (error) {
    console.error("Error fetching repositories: ", error);
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}
