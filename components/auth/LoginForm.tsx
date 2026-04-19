"use client";

import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useLogin } from "@/hooks/useLogin";
import { loginFormDataSchema, LoginFormData } from "@/types/auth";
import { useTranslation } from "react-i18next";

export default function LoginForm() {
  const { mutate, isPending } = useLogin();
  const { t } = useTranslation();

  const schema = loginFormDataSchema(t);

  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [apiError, setApiError] = useState("");

  const handleChange =
    (field: keyof LoginFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = schema.safeParse(form);

    if (!result.success) {
      const formatted = result.error.flatten();

      setErrors({
        email: formatted.fieldErrors.email?.[0],
        password: formatted.fieldErrors.password?.[0],
      });
      return;
    }

    setErrors({});
    setApiError("");

    mutate(form, {
      onSuccess: ({ data, token }) => {
        console.log("Login success:", data);

        if (token) {
          document.cookie = `token=${token}; path=/`;
        }

        window.location.replace("/tasks");
      },
      onError: (err) => {
        setApiError(err.message);
      },
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 10 }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Login
      </Typography>

      <TextField
        fullWidth
        label="Email"
        margin="normal"
        value={form.email}
        onChange={handleChange("email")}
        error={!!errors.email}
        helperText={errors.email}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={form.password}
        onChange={handleChange("password")}
        error={!!errors.password}
        helperText={errors.password}
      />

      {apiError && (
        <Typography color="error" variant="body2">
          {apiError}
        </Typography>
      )}

      <Button
        fullWidth
        variant="contained"
        type="submit"
        sx={{ mt: 2 }}
        disabled={isPending}
      >
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </Box>
  );
}