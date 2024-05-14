import { gql } from "graphql-tag";

export const ADD_HISTORY_ITEM = gql`
  mutation addClient($event: HistoryItem!, $projectId: ID, $clientId: ID) {
    addClient(event: $event, projectId: $projectId, clientID: $clientID) {
      id
      event
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
