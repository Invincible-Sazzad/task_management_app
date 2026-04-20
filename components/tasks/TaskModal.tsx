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

type TaskFormErrors = {
  title?: string;
  status?: string;
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

  const [errors, setErrors] = useState<TaskFormErrors>({});

  const { t } = useTranslation();

  const handleChange = <K extends keyof TaskForm>(
    field: K,
    value: TaskForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (field in errors) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = () => {
    if (initialData) {
      onSubmit(form);
      onClose();
      return;
    }

    const newErrors: TaskFormErrors = {};
    if (!form.title.trim()) newErrors.title = t("taskCreate.errors.titleRequired");
    if (!form.status) newErrors.status = t("taskCreate.errors.statusRequired");

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
            required={!initialData}
            value={form.title}
            onChange={(e) => {
              if (e.target.value.length > 255) {
                setErrors((prev) => ({
                  ...prev,
                  title: t("taskCreate.errors.titleTooLong"),
                }));
                return;
              }
              handleChange("title", e.target.value);
            }}
            fullWidth
            error={!!errors.title}
            helperText={errors.title}
          />

          <TextField
            label={t("task.description")}
            value={form.description ?? ""}
            onChange={(e) => {
              if (e.target.value.length > 500) {
                setErrors((prev) => ({
                  ...prev,
                  description: t("taskCreate.errors.descriptionTooLong"),
                }));
                return;
              }
              handleChange("description", e.target.value);
            }}
            multiline
            rows={3}
            fullWidth
          />

          <TextField
            select
            label={t("task.status")}
            required={!initialData}
            value={form.status}
            onChange={(e) =>
              handleChange("status", e.target.value as TaskStatus)
            }
            error={!!errors.status}
            helperText={errors.status}
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

      <DialogActions sx={{ px: 3 }}>
        <Button onClick={onClose}>{t("modal.cancel")}</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {form.id ? t("modal.updateButton") : t("modal.createButton")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}