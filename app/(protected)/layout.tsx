"use client";

import { ReactNode } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import LogoutButton from "@/components/common/LogoutButton";

export default function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task App
          </Typography>

          <LogoutButton />
        </Toolbar>
      </AppBar>

      {/* Page content */}
      <Box sx={{ p: 3 }}>{children}</Box>
    </>
  );
}