import { useMutation } from "@apollo/client/react";
import { CREATE_TASK_MUTATION } from "@/graphql/mutations/createTask";
import { CreateTaskInput } from "@/types/tasks";

export const useCreateTask = () => {
  const [createTask, { data, loading, error }] = useMutation(CREATE_TASK_MUTATION, {
    update(cache, {}) {
      if (error) return;

      cache.evict({ fieldName: "tasks" });
      cache.gc();
    },
  });

  const handleCreateTask = async (task: CreateTaskInput) => {
    try {
      return await createTask({
        variables: {
          task: {
            title: task.title,
            description: task.description,
            status: task.status,
            dueDate: task.dueDate,
          },
        },
      });
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return { handleCreateTask, data, loading, error };
};