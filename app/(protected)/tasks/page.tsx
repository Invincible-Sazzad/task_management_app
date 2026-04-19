import { Box } from "@mui/material";
import TasksClient from "./TasksClient";

export default function TasksPage() {
  return (
    <Box sx={{ p: 4 }}>
      <TasksClient />
    </Box>
  );
}