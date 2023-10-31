import { gql } from "@apollo/client";

const ADD_KANBAN = gql`
  mutation AddKanban(
    $title: String!
    $description: String
    $statusColumns: String
    $projectId: ID!
  ) {
    addProject(
      title: $title
      description: $description
      statusColumns: $statusColumns
      projectId: $projectId
    ) {
      id
      title
      description
      statusColumns
      project {
        id
        title
      }
    }
  }
`;

const DELETE_KANBAN = gql`
  mutation DeleteKanban($id: ID!) {
    deleteKanban(id: $id) {
      id
    }
  }
`;

const UPDATE_KANBAN = gql`
  mutation UpdateKanban(
    $id: ID!
    $title: String
    $description: String
    $statusColumns: String
  ) {
    updateKanban(
      id: $id
      title: $title
      description: $description
      statusColumns: $statusColumns
    ) {
      id
      title
      description
      statusColumns
      project {
        id
        title
      }
    }
  }
`;

export { ADD_KANBAN, UPDATE_KANBAN, DELETE_KANBAN };
