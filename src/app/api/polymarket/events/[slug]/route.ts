import { NextRequest, NextResponse } from "next/server";
import {
  createSuccessResponse,
  createErrorResponse,
} from "@/src/utils/api-helpers";

const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<Response> => {
  try {
    const { slug } = await params;

    const response = await fetch(
      `https://gamma-api.polymarket.com/events/slug/${encodeURIComponent(slug)}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Polymarket API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return NextResponse.json(createSuccessResponse({ event: data }));
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(
        error instanceof Error
          ? error.message
          : "Failed to fetch Polymarket event"
      ),
      { status: 500 }
    );
  }
};

export { GET };
