import { gql } from "@apollo/client";

const GET_KANBANS = gql`
  query getKanbans {
    kanbans {
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

const GET_KANBAN = gql`
  query getKanban($id: ID) {
    kanban(id: $id) {
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

export { GET_KANBANS, GET_KANBAN };
