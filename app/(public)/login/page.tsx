import LoginForm from "@/components/auth/LoginForm";
import { Box } from "@mui/material";

export default function LoginPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <LoginForm />
    </Box>
  );
}