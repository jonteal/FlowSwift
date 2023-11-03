import { gql } from "@apollo/client";

const ADD_HISTORY_ITEM = gql`
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

export { ADD_HISTORY_ITEM };
