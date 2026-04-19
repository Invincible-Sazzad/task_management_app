"use client";

import { useTasks } from "@/hooks/useTasks";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  TextField,
  MenuItem,
  Button,
  Pagination,
} from "@mui/material";
import { useState } from "react";
import { CreateTaskInput, TaskParams } from "@/types/tasks";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import TaskModal from "@/components/tasks/TaskModal";
import { useCreateTask } from "@/hooks/useCreateTask";
import AddIcon from "@mui/icons-material/Add";

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

export default function TasksClient() {
  const [filters, setFilters] = useState<TaskParams>({
    status: undefined,
    dueDateFrom: undefined,
    dueDateTo: undefined,
    page: 1,
    limit: 20,
  });
  const { data, loading, error } = useTasks(filters);
  const { t } = useTranslation();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const { handleCreateTask, error: createError } = useCreateTask();

  if (loading) return <Typography>{t("taskList.loading")}</Typography>;
  if (error) return <Typography color="error">{t("taskList.error")}</Typography>;

  const tasks = data?.tasks.tasks ?? [];
  const pagination = data?.tasks;

  const handleChange = <K extends keyof TaskParams>(
    field: K,
    value: TaskParams[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
      page: 1,
    }));
  };

  const handlePageChange = (_: unknown, page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const createTask = async (task: CreateTaskInput) => {
    await handleCreateTask(task);
    if (!createError) {
      setOpenModal(false);
      router.refresh();
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap"
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          {t("taskList.title")}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
          startIcon={<AddIcon />}
          sx={{ height: "40px", mb: 2 }}
        >
          {t("taskList.addButtonText")}
        </Button>
      </Box>
   
      <Box sx={{ p: 2 }}>
        {/* 🔎 FILTER FORM */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            mb: 3,
          }}
        >
          {/* Status */}
          <TextField
            select
            label={t("taskList.filters.status")}
            value={filters.status ?? ""}
            onChange={(e) =>
              handleChange(
                "status",
                e.target.value === ""
                  ? undefined
                  : (e.target.value as TaskParams["status"])
              )
            }
            sx={{ minWidth: 160 }}
          >
            <MenuItem value="">{t("taskList.filters.statusOptions.all")}</MenuItem>
            <MenuItem value="pending">{t("taskList.filters.statusOptions.pending")}</MenuItem>
            <MenuItem value="in_progress">{t("taskList.filters.statusOptions.inProgress")}</MenuItem>
            <MenuItem value="completed">{t("taskList.filters.statusOptions.completed")}</MenuItem>
          </TextField>

          {/* From Date */}
          <DatePicker
            label={t("taskList.filters.dueDateFrom")}
            value={filters.dueDateFrom ? dayjs(filters.dueDateFrom) : null}
            onChange={(value: Dayjs | null) =>
              handleChange(
                "dueDateFrom",
                value ? value.format("YYYY-MM-DD") : undefined
              )
            }
            slotProps={{
              textField: {
                size: "medium",
              },
            }}
          />

          {/* To Date */}
          <DatePicker
            label={t("taskList.filters.dueDateTo")}
            value={filters.dueDateTo ? dayjs(filters.dueDateTo) : null}
            onChange={(value: Dayjs | null) =>
              handleChange(
                "dueDateTo",
                value ? value.format("YYYY-MM-DD") : undefined
              )
            }
            slotProps={{
              textField: {
                size: "medium",
              },
            }}
          />

          {/* Reset */}
          <Button
            variant="outlined"
            color="secondary"
            onClick={() =>
              setFilters({
                status: undefined,
                dueDateFrom: undefined,
                dueDateTo: undefined,
                page: 1,
                limit: 20,
              })
            }
            sx={{ height: "56px" }}
          >
            {t("taskList.filters.reset")}
          </Button>
        </Box>

        {/* TASK LIST */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: { sm: "center", md: "flex-start" },
            gap: 2,
          }}
        >
          {tasks.map((task) => (
            <Card
              key={task.id}
              sx={{
                width: "100%",
                flexGrow: 1,
                maxWidth: "360px",
                borderRadius: 3,
                boxShadow: 2,
                transition: "all 0.2s ease",
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-4px)",
                },
                cursor: "pointer",
              }}
              onClick={() => router.push(`/tasks/${task.id}`)}
            >
              <CardContent>
                <Stack spacing={1.5}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {task.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ minHeight: 40 }}
                  >
                    {task.description || ""}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Chip
                      label={t(`taskList.filters.statusOptions.${task.status}`)}
                      color={getStatusColor(task.status)}
                      size="small"
                      sx={{ textTransform: "capitalize" }}
                    />

                    <Typography variant="caption" color="text.secondary">
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "期限日なし"}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* 📄 PAGINATION */}
        {pagination && pagination.pages > 1 && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              mt: 4
            }}
          >
            <Pagination
              count={pagination.pages}
              page={filters.page}
              onChange={handlePageChange}
              color="primary"
              sx={{
                "& ul": {
                  justifyContent: "center",
                },
              }}
            />
          </Box>
        )}

        {openModal && (
          <TaskModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onSubmit={(task: CreateTaskInput) => {
              createTask(task);
            }}
          />
        )}
      </Box>
     </>
  );
}