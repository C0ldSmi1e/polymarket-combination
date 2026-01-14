import { NextResponse, NextRequest } from "next/server";
import { createSuccessResponse, createErrorResponse } from "@/src/utils/api-helpers";
import { getCombos, createCombo } from "@/src/actions/server/combos";
import { ComboFormSchema } from "@/src/schemas/combo";


const GET = async (): Promise<Response> => {
  try {
    const combos = await getCombos();
    return NextResponse.json(
      createSuccessResponse({ combos })
    );
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(
        error instanceof Error ? error.message : "An error occurred in route: GET /api/combos."
      )
    );
  }
};

const POST = async (request: NextRequest): Promise<Response> => {
  try {
    const requestData = await request.json();
    const validationResult = ComboFormSchema.safeParse(requestData);
    if (!validationResult.success) {
      throw new Error("Invalid combo data");
    }
    const newCombo = await createCombo(validationResult.data);
    return NextResponse.json(
      createSuccessResponse({
        message: "Combo created successfully.",
        combo: newCombo
      })
    );
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(
        error instanceof Error ? error.message : "An error occurred in route: POST /api/combos."
      )
    );
  }
};

export { GET, POST };