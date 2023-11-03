import { gql } from "@apollo/client";

const GET_KANBAN_STATUS_COLUMNS = gql`
  query getKanbanStatusColumns($kanbanId: ID) {
    kanbanStatusColumns(kanbanId: $kanbanId) {
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

const GET_KANBAN_STATUS_COLUMN = gql`
  query getKanbanStatusColumn($id: ID) {
    kanbanStatusColumn(id: $id) {
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

export { GET_KANBAN_STATUS_COLUMNS, GET_KANBAN_STATUS_COLUMN };
