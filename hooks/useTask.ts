import { useQuery } from "@apollo/client/react";
import { GET_TASK } from "@/graphql/queries/task";
import { Task } from "@/types/tasks";

type GetTaskResponse = {
  task: Task;
};

export const useTask = (id: string) => {
  return useQuery<GetTaskResponse>(GET_TASK, {
    variables: { id },
    skip: !id,
  });
};