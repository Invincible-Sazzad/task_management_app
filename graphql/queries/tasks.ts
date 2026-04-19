import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GetTasks(
    $page: Int
    $limit: Int
    $status: TaskStatusEnum
    $dueDateFrom: ISO8601Date
    $dueDateTo: ISO8601Date
  ) {
    tasks(
      page: $page
      limit: $limit
      status: $status
      dueDateFrom: $dueDateFrom
      dueDateTo: $dueDateTo
    ) {
      tasks {
        id
        title
        description
        status
        dueDate
        completedAt
      }
      page
      pages
      limit
      count
    }
  }
`;