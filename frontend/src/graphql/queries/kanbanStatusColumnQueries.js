import { gql } from "@apollo/client";

const GET_KANBAN_STATUS_COLUMNS = gql`
  query getKanbanStatusColumns($kanbanId: ID) {
    kanbanStatusColumn(kanbanId: $kanbanId) {
      id
      columnState
      columnDescription
      kanban {
        id
        title
      }
    }
  }
`;

const GET_KANBAN_STATUS_COLUMN = gql`
  query getKanbanStatusColumn($kanbanId: ID) {
    kanbanStatusColumn(kanbanId: $kanbanId) {
      id
      columnState
      columnDescription
      kanban {
        id
        title
      }
    }
  }
`;

export { GET_KANBAN_STATUS_COLUMNS, GET_KANBAN_STATUS_COLUMN };
