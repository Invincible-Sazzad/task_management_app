import { useMutation } from "@apollo/client/react";
import { useApolloClient } from "@apollo/client/react";
import { DELETE_TASK_MUTATION } from "@/graphql/mutations/deleteTask";

export const useTaskDelete = () => {
  const client = useApolloClient();
  const [deleteTask, { data, loading, error }] = useMutation(DELETE_TASK_MUTATION);

  const handleDeleteTask = async (taskId: string) => {
    try {
      const result = await deleteTask({
        variables: { input: { id: taskId } },
      });

      if (!error) {
        client.cache.evict({ id: client.cache.identify({ __typename: "Task", id: taskId }) });
        client.cache.gc();
      }

      return result;
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return { handleDeleteTask, data, loading, error };
};