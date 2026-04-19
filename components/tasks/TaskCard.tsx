"use client";

import {
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";
import { Task } from "@/types/tasks";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>

        {task.description && (
          <Typography variant="body2" color="text.secondary">
            {task.description}
          </Typography>
        )}

        <Chip
          label={task.status}
          color={
            task.status === "completed"
              ? "success"
              : task.status === "in_progress"
              ? "warning"
              : "default"
          }
          size="small"
          sx={{ mt: 1 }}
        />
      </CardContent>
    </Card>
  );
}