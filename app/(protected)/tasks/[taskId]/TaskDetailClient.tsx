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
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import TaskModal from "@/components/tasks/TaskModal";
import { useState } from "react";
import { useUpdateTask } from "@/hooks/useUpdateTask";

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
  const [openModal, setOpenModal] = useState(false);

  const { handleUpdateTask, data: updateData, error: updateError } = useUpdateTask();

  if (loading) return <Typography>{t("taskDetail.loading")}</Typography>;
  if (error) return <Typography color="error">{t("taskDetail.error")}</Typography>;
  if (updateError) return <Typography color="error">{t("taskDetail.updateError")}</Typography>;

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
              label={t(`taskList.filters.statusOptions.${task.status == "in_progress" ? "inProgress" : task.status}`)}
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

          {task.status !== "completed" && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.preventDefault();
                setOpenModal(true);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </CardContent>
      </Card>
      {openModal && (
        <TaskModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          initialData={task}
          onSubmit={(updatedTask) => {
            handleUpdateTask({...updatedTask, id: task.id });
            setOpenModal(false);
             if (updateData) {
              router.refresh();
            }
          }}
        />
      )}
    </Box>
  );
}