import { gql } from "@apollo/client";

const ADD_KANBAN_STATUS_COLUMN = gql`
  mutation AddKanbanStatusColumn(
    $title: String!
    $description: String
    $kanbanId: ID!
  ) {
    addKanbanStatusColumn(
      title: $title
      description: $description
      kanbanId: $kanbanId
    ) {
      id
      title
      description
      kanban {
        id
        title
      }
    }
  }
`;

const DELETE_KANBAN_STATUS_COLUMN = gql`
  mutation DeleteKanbanStatusColumn($id: ID!) {
    deleteKanbanStatusColumn(id: $id) {
      id
    }
  }
`;

const UPDATE_KANBAN_STATUS_COLUMN = gql`
  mutation UpdateKanbanStatusColumn(
    $id: ID!
    $title: String
    $description: String
  ) {
    updateKanbanStatusColumn(
      id: $id
      title: $title
      description: $description
    ) {
      id
      title
      description
      kanban {
        id
        title
      }
    }
  }
`;

export {
  ADD_KANBAN_STATUS_COLUMN,
  UPDATE_KANBAN_STATUS_COLUMN,
  DELETE_KANBAN_STATUS_COLUMN,
};
