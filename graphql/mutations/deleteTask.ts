import { gql } from '@apollo/client';

export const DELETE_TASK_MUTATION = gql`
  mutation deleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      success
      errors
    }
  }
`;