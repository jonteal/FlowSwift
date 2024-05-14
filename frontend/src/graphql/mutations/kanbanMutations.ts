import { gql } from "graphql-tag";

export const ADD_KANBAN = gql`
  mutation AddKanban($title: String!, $description: String, $projectId: ID!) {
    addKanban(title: $title, description: $description, projectId: $projectId) {
      id
      title
      description
      project {
        id
        title
      }
    }
  }
`;

export const DELETE_KANBAN = gql`
  mutation DeleteKanban($id: ID!) {
    deleteKanban(id: $id) {
      id
    }
  }
`;

export const UPDATE_KANBAN = gql`
  mutation UpdateKanban($id: ID!, $title: String, $description: String) {
    updateKanban(id: $id, title: $title, description: $description) {
      id
      title
      description
      project {
        id
        title
      }
    }
  }
`;

