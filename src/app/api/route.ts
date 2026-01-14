import { createSuccessResponse, createErrorResponse } from "@/src/utils/api-helpers";
import { NextRequest, NextResponse } from "next/server";

const GET = async (_request: NextRequest): Promise<NextResponse> => {
  try {
    return NextResponse.json(
      createSuccessResponse({ message: "Hello, world!" })
    );
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(
        error instanceof Error ? error.message : "An error occurred in route: GET /api."
      )
    );
  }
};

export { GET };