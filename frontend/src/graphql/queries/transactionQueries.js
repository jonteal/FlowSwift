import { gql } from "@apollo/client";

const GET_PROJECT_TRANSACTIONS = gql`
  query getTransactions($projectId: ID) {
    projectTransactions(projectId: $projectId) {
      id
      paymentDate
      amount
      paymentParty
      incomingOutgoing
      client {
        id
        firstName
        lastName
      }
      project {
        id
        title
      }
      createdAt
    }
  }
`;

const GET_ALL_CLIENT_TRANSACTIONS = gql`
  query getTransactions($clientId: ID) {
    clientTransactions(clientId: $clientId) {
      id
      paymentDate
      amount
      paymentParty
      incomingOutgoing
      client {
        id
        firstName
        lastName
      }
      project {
        id
        title
      }
      createdAt
    }
  }
`;

const GET_TRANSACTION = gql`
  query getTransaction($id: ID) {
    transaction(id: $id) {
      id
      paymentDate
      amount
      paymentParty
      incomingOutgoing
      client {
        id
        firstName
        lastName
      }
      project {
        id
        title
      }
      createdAt
    }
  }
`;

export {
  GET_ALL_CLIENT_TRANSACTIONS,
  GET_PROJECT_TRANSACTIONS,
  GET_TRANSACTION,
};
