import { Box } from "@mui/material";
import TasksClient from "./TasksClient";

export default function TasksPage() {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 2, md: 4 },
      }}
    >
      <TasksClient />
    </Box>
  );
}