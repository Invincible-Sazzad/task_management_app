import { gql } from '@apollo/client';

export const UPDATE_TASK_MUTATION = gql`
  mutation updateTask($task: UpdateTaskInput!) {
    updateTask(input: $task) {
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