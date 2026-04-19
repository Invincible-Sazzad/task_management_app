import { z } from "zod";

export const paginationParamsSchema = z.object({
  limit: z.number().optional(),
  page: z.number().optional(),
});

export type PaginationParams = z.infer<typeof paginationParamsSchema>;