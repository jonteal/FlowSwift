import gql from "graphql-tag";

export const ADD_TRANSACTION = gql`
  mutation AddTransaction(
    $paymentDate: String!
    $amount: String!
    $paymentParty: String!
    $clientId: ID!
    $projectId: ID!
    $incomingOutgoing: IncomingOutgoing!
  ) {
    addTransaction(
      paymentDate: $paymentDate
      amount: $amount
      paymentParty: $paymentParty
      clientId: $clientId
      projectId: $projectId
      incomingOutgoing: $incomingOutgoing
    ) {
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

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id) {
      id
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction(
    $id: ID!
    $paymentDate: String
    $amount: String
    $paymentParty: String
    $incomingOutgoing: IncomingOutgoingUpdate!
  ) {
    updateProject(
      id: $id
      paymentDate: $paymentDate
      amount: $amount
      paymentParty: $paymentParty
      incomingOutgoing: $incomingOutgoing
    ) {
      id
      paymentDate
      amount
      paymentParty
      client {
        id
        firstName
        lastName
      }
      project {
        id
        title
      }
      incomingOutgoing
      createdAt
    }
  }
`;
