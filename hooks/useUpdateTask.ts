import { useMutation } from "@apollo/client/react";
import { UPDATE_TASK_MUTATION } from "@/graphql/mutations/updateTask";
import { UpdateTaskInput } from "@/types/tasks";

export const useUpdateTask = () => {
  const [updateTask, { data, loading, error }] = useMutation(UPDATE_TASK_MUTATION);

  const handleUpdateTask = async (task: UpdateTaskInput) => {
    try {
      await updateTask({
        variables: {
          task: {
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            dueDate: task.dueDate,
          },
        },
      });
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return { handleUpdateTask, data, loading, error };
};