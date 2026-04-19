import { gql } from '@apollo/client';

export const CREATE_TASK_MUTATION = gql`
  mutation createTask($task: CreateTaskInput!) {
    createTask(input: $task) {
      task {
        id
        title
        description
        status
        dueDate
        completedAt
      }
      errors
    }
  }
`;