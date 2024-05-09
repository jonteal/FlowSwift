import gql from 'graphql-tag'

export const GET_PROJECT_INVOICES = gql`
  query getProjectInvoices($projectId: ID) {
    projectInvoices(projectId: $projectId) {
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

export const GET_ALL_CLIENT_INVOICES = gql`
  query getInvoices($clientId: ID) {
    clientInvoices(clientId: $clientId) {
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

export const GET_INVOICE = gql`
  query getInvoice($id: ID) {
    invoice(id: $id) {
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

