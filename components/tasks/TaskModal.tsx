"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type TaskStatus = "pending" | "in_progress" | "completed";

type TaskForm = {
  id?: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  dueDate?: string | null;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: TaskForm) => void;
  initialData?: TaskForm;
};

export default function TaskModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [form, setForm] = useState<TaskForm>(() =>
    initialData || {
      id: undefined,
      title: "",
      description: "",
      status: "pending",
      dueDate: undefined,
    }
  );

  const { t } = useTranslation();

  const handleChange = <K extends keyof TaskForm>(
    field: K,
    value: TaskForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {form.id ? t("taskUpdate.title") : t("taskCreate.title")}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label={t("task.title")}
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            fullWidth
          />

          <TextField
            label={t("task.description")}
            value={form.description ?? ""}
            onChange={(e) => handleChange("description", e.target.value)}
            multiline
            rows={3}
            fullWidth
          />

          <TextField
            select
            label={t("task.status")}
            value={form.status}
            onChange={(e) =>
              handleChange("status", e.target.value as TaskStatus)
            }
          >
            <MenuItem value="pending">{t("task.statusOptions.pending")}</MenuItem>
            <MenuItem value="in_progress">{t("task.statusOptions.in_progress")}</MenuItem>
            <MenuItem value="completed">{t("task.statusOptions.completed")}</MenuItem>
          </TextField>

          <DatePicker
            label={t("task.dueDate")}
            value={form.dueDate ? dayjs(form.dueDate) : null}
            onChange={(value: Dayjs | null) =>
              handleChange(
                "dueDate",
                value ? value.format("YYYY-MM-DD") : undefined
              )
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{t("modal.cancel")}</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {form.id ? t("modal.updateButton") : t("modal.createButton")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}