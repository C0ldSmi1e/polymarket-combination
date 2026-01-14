import { z } from "zod";

const StandardResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => {
  return z.object({
    data: dataSchema.nullable(),
    error: z.string().nullable(),
  });
};

type StandardResponse<T> = z.infer<ReturnType<typeof StandardResponseSchema>>;

export { StandardResponseSchema };
export type { StandardResponse };