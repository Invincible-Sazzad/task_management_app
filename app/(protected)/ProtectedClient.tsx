"use client";

import { ReactNode } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import LogoutButton from "@/components/common/LogoutButton";
import { useTranslation } from "react-i18next";

export default function ProtectedClient({
  children,
}: {
  children: ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {t("app.name")}
          </Typography>

          <LogoutButton />
        </Toolbar>
      </AppBar>

      {/* Page content */}
      <Box
        sx={{
          py: 3,
          px: { xs: 1, sm: 1, md: 3 },
        }}
      >
        {children}
      </Box>
    </>
  );
}