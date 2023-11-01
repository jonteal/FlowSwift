import { gql } from "@apollo/client";

const ADD_KANBAN_STATUS_COLUMN = gql`
  mutation AddKanbanStatusColumn(
    $columnState: String!
    $columnDescription: String
    $position: String!
    $kanbanId: ID!
  ) {
    addKanbanStatusColumn(
      columnState: $columnState
      columnDescription: $columnDescription
      position: $position
      kanbanId: $kanbanId
    ) {
      id
      columnState
      columnDescription
      position
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
    $columnState: String
    $columnDescription: String
    $position: String
    $kanbanId: ID!
  ) {
    updateKanbanStatusColumn(
      id: $id
      columnState: $columnState
      columnDescription: $columnDescription
      position: $position
      kanbanId: $kanbanId
    ) {
      id
      columnState
      columnDescription
      position
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
