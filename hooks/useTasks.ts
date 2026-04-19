import { useQuery } from "@apollo/client/react";
import { GET_TASKS } from "@/graphql/queries/tasks";
import { TasksResponse, TaskParams } from "@/types/tasks";


export const useTasks = (variables: TaskParams = {}) => {
  const { data, loading, error } = useQuery<TasksResponse>(GET_TASKS, {
    variables: {
      page: variables.page ?? 1,
      limit: variables.limit ?? 20,
      status: variables.status,
      dueDateFrom: variables.dueDateFrom,
      dueDateTo: variables.dueDateTo,
    },
  });

  return { data, loading, error };
};