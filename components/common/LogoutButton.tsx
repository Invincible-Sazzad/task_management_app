"use client";

import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { apiClient } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiClient("/logout", {
        method: "DELETE",
        auth: true,
      });
    } catch (e) {
      console.error("Logout failed:", e);
    }

    document.cookie = "token=; path=/; max-age=0";

    router.replace("/login");
  };

  return (
    <IconButton color="inherit" onClick={handleLogout}>
      <LogoutIcon />
    </IconButton>
  );
}