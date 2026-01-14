import { NextRequest, NextResponse } from "next/server";
import { createSuccessResponse, createErrorResponse } from "@/src/utils/api-helpers";
import { ComboFormSchema } from "@/src/schemas/combo";
import { getCombo, updateCombo, deleteCombo } from "@/src/actions/server/combos";

const GET = async (_request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<Response> => {
  try {
    const resolvedParams = await params;
    const comboId = parseInt(resolvedParams.id, 10);
    const combo = await getCombo(comboId);
    if (!combo) {
      throw new Error("Combo not found");
    }
    return NextResponse.json(
      createSuccessResponse({ combo })
    );
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(
        error instanceof Error ? error.message : "An error occurred in route: GET /api/combos/[id]."
      )
    );
  }
};

const PUT = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<Response> => {
  try {
    const resolvedParams = await params;
    const comboId = parseInt(resolvedParams.id, 10);
    const requestData = await request.json();
    const validationResult = ComboFormSchema.safeParse(requestData);
    if (!validationResult.success) {
      throw new Error("Invalid combo data");
    }
    const updatedCombo = await updateCombo(comboId, validationResult.data);
    return NextResponse.json(
      createSuccessResponse({
        message: "Combo updated successfully.",
        combo: updatedCombo
      })
    );
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(
        error instanceof Error ? error.message : "An error occurred in route: PUT /api/combos/[id]."
      )
    );
  }
};

const DELETE = async (_request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<Response> => {
  try {
    const resolvedParams = await params;
    const comboId = parseInt(resolvedParams.id, 10);
    await deleteCombo(comboId);
    return NextResponse.json(
      createSuccessResponse({
        message: "Combo deleted successfully."
      })
    );
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(
        error instanceof Error ? error.message : "An error occurred in route: DELETE /api/combos/[id]."
      )
    );
  }
};

export { GET, PUT, DELETE };