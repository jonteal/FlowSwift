// import { gql } from "@apollo/client";
import gql from 'graphql-tag'

export const GET_CLIENTS = gql`
  query getClients($organizationId: ID) {
    clients(organizationId: $organizationId) {
      id
      firstName
      lastName
      phoneNumber
      emailAddress
      companyName
      status
      organization {
        id
        organizationName
      }
    }
  }
`;

export const GET_CLIENTS_BY_STATUS = gql`
  query getClients($status: String) {
    clientsByStatus(status: $status) {
      id
      firstName
      lastName
      phoneNumber
      emailAddress
      companyName
      status
      organization {
        id
        organizationName
      }
    }
  }
`;

export const GET_CLIENT = gql`
  query getClient($id: ID) {
    client(id: $id) {
      id
      firstName
      lastName
      phoneNumber
      emailAddress
      companyName
      status
      organization {
        id
        organizationName
      }
    }
  }
`;

