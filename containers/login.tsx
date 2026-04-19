"use client";

import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

export default function Login() {
  const { t } = useTranslation();
  return (
    <Box>
      <h1>{t("login.title")}</h1>
    </Box>
  );
}