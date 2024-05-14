import { gql } from "graphql-tag";

export const ADD_INVOICE = gql`
  mutation AddInvoice(
    $date: String!
    $amount: String!
    $notes: String
    $clientId: ID!
    $projectId: ID!
    $invoiceNumber: String!
  ) {
    addInvoice(
      date: $date
      amount: $amount
      notes: $notes
      invoiceNumber: $invoiceNumber
      clientId: $clientId
      projectId: $projectId
    ) {
      id
      date
      amount
      notes
      invoiceNumber
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

export const DELETE_INVOICE = gql`
  mutation DeleteInvoice($id: ID!) {
    deleteInvoice(id: $id) {
      id
    }
  }
`;

export const UPDATE_INVOICE = gql`
  mutation UpdateInvoice(
    $id: ID!
    $date: String
    $notes: String
    $amount: String
    $invoiceNumber: String
  ) {
    updateProject(
      id: $id
      date: $date
      amount: $amount
      notes: $notes
      invoiceNumber: $invoiceNumber
    ) {
      id
      date
      amount
      notes
      invoiceNumber
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

