import { gql } from "@apollo/client";

export const GET_TASK = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      title
      description
      status
      dueDate
      completedAt
    }
  }
`;