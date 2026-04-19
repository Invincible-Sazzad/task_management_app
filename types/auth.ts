import { z } from "zod";
import { type TFunction } from "next-i18next";

export interface LoginRequest {
  email: string;
  password: string;
}

export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const loginFormDataSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .min(1, t("errors.email.required")),

    password: z
      .string()
      .min(1, t("errors.password.required"))
      .min(6, t("errors.password.min", { min: 6 }))
      .max(64, t("errors.password.max", { max: 64 })),
  });

export type LoginFormData = z.infer<ReturnType<typeof loginFormDataSchema>>;

export const errorResponseSchema = z.object({
  message: z.string(),
  errors: z.array(z.string()).optional(),
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;

export const loginResponseSchema = z.object({
  message: z.string(),
  user: userSchema,
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const loginApiResponseSchema = z.union([
  loginResponseSchema,
  errorResponseSchema,
]);

export type LoginApiResponse = z.infer<typeof loginApiResponseSchema>;