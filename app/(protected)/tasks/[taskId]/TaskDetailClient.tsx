"use client";

import { useTask } from "@/hooks/useTask";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "success";
    case "in_progress":
      return "warning";
    case "pending":
      return "default";
    default:
      return "default";
  }
}

export default function TaskDetailClient({ taskId }: { taskId: string }) {
  const { data, loading, error } = useTask(taskId);
  const router = useRouter();
  const { t } = useTranslation();

  if (loading) return <Typography>{t("taskDetail.loading")}</Typography>;
  if (error) return <Typography color="error">{t("taskDetail.error")}</Typography>;

  const task = data?.task;

  if (!task) {
    return <Typography>{t("taskDetail.notFound")}</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      {/* Back Button */}
      <Button
        variant="text"
        onClick={() => router.push("/tasks")}
        sx={{ mb: 2 }}
      >
        ← {t("taskDetail.back")}
      </Button>

      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Stack spacing={2}>
            {/* Title */}
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {task.title}
            </Typography>

            {/* Status */}
            <Chip
              label={t(`taskList.filters.statusOptions.${task.status}`)}
              color={getStatusColor(task.status)}
              sx={{ width: "fit-content" }}
            />

            {/* Description */}
            <Typography variant="body1" color="text.secondary">
              {task.description || t("taskDetail.noDescription")}
            </Typography>

            {/* Dates */}
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t("taskDetail.dueDate")}:
              </Typography>
              <Typography>
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : t("taskDetail.noDueDate")}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary">
                {t("taskDetail.completedAt")}:
              </Typography>
              <Typography>
                {task.completedAt
                  ? new Date(task.completedAt).toLocaleString()
                  : t("taskDetail.notCompleted")}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}