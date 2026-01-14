import { StandardResponse } from "@/src/schemas/standard-response";

/**
 * Creates a success response with the provided data
 */

const createSuccessResponse = <T>(data: T): StandardResponse<T> => {
  return {
    data,
    error: null,
  };
}

/**
 * Creates an error response with the provided error code and message
 */

const createErrorResponse = (errorMessage: string): StandardResponse<null> => {
  return {
    data: null,
    error: errorMessage,
  };
}

export { createSuccessResponse, createErrorResponse };