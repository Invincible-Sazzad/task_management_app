import { z } from "zod";
import { paginationParamsSchema } from "./pagination";

export const taskParamsSchema = paginationParamsSchema.extend({
  status: z.enum(["pending", "in_progress", "completed"]).optional(),
  dueDateFrom: z.string().optional(),
  dueDateTo: z.string().optional(),
});

export type TaskParams = z.infer<typeof taskParamsSchema>;

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  status: z.enum(["pending", "in_progress", "completed"]),
  dueDate: z.string().nullish(),
  completedAt: z.string().nullish(),
});

export type Task = z.infer<typeof taskSchema>;

export const taskPaginationSchema = z.object({
  tasks: z.array(taskSchema),
  page: z.number(),
  pages: z.number(),
  limit: z.union([z.string(), z.number()]),
  count: z.number(),
});

export const tasksResponseSchema = z.object({
  tasks: taskPaginationSchema,
});

export type TasksResponse = z.infer<typeof tasksResponseSchema>;

export const updateTaskInputSchema = z.object({
  id: z.string(),
  title: z.string().nullish(),
  description: z.string().nullish(),
  status: z.string().nullish(),
  dueDate: z.string().nullish(),
});

export type UpdateTaskInput = z.infer<typeof updateTaskInputSchema>;

export const updateTaskResponseSchema = z.object({
  updateTask: z.object({
    task: taskSchema,
    errors: z.array(z.string()),
  }),
});

export type UpdateTaskResponse = z.infer<typeof updateTaskResponseSchema>;

export const createTaskInputSchema = z.object({
  title: z.string(),
  description: z.string().nullish(),
  status: z.string().nullish(),
  dueDate: z.string().nullish(),
});

export type CreateTaskInput = z.infer<typeof createTaskInputSchema>;

export const createTaskResponseSchema = z.object({
  createTask: z.object({
    task: taskSchema,
    errors: z.array(z.string()),
  }),
});

export type CreateTaskResponse = z.infer<typeof createTaskResponseSchema>;
