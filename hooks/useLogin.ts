import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import {
  LoginFormData,
  loginResponseSchema,
  LoginResponse,
} from "@/types/auth";

export const useLogin = () => {
  return useMutation<
    { data: LoginResponse; token?: string },
    Error,
    LoginFormData
  >({
    mutationFn: async (form) => {
      const res = await apiClient<LoginResponse>("/login", {
        method: "POST",
        body: JSON.stringify({
          user: form,
        }),
      });

      const parsed = loginResponseSchema.parse(res.data);

      return {
        data: parsed,
        token: res.token,
      };
    },
  });
};