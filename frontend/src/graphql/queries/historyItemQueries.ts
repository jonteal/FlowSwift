import { gql } from "@apollo/client";

const GET_HISTORY_ITEMS = gql`
  query getHistoryItems {
    historyItems {
      id
      event
      createdAt
      project {
        id
        title
      }
      client {
        id
        firstName
        lastName
      }
    }
  }
`;

const GET_HISTORY_ITEM = gql`
  query getHistoryItem($id: ID) {
    historyItem(id: $id) {
      id
      event
      createdAt
      project {
        id
        title
      }
      client {
        id
        firstName
        lastName
      }
    }
  }
`;

export { GET_HISTORY_ITEMS, GET_HISTORY_ITEM };
