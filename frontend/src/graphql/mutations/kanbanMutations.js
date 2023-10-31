import { gql } from "@apollo/client";

const ADD_KANBAN = gql`
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

const DELETE_KANBAN = gql`
  mutation DeleteKanban($id: ID!) {
    deleteKanban(id: $id) {
      id
    }
  }
`;

const UPDATE_KANBAN = gql`
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

export { ADD_KANBAN, UPDATE_KANBAN, DELETE_KANBAN };
