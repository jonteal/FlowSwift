import { gql } from "@apollo/client";

const ADD_CLIENT = gql`
  mutation addClient(
    $organizationId: ID!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String
    $emailAddress: String
    $companyName: String
    $status: ClientStatus!
  ) {
    addClient(
      organizationId: $organizationId
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      emailAddress: $emailAddress
      companyName: $companyName
      status: $status
    ) {
      id
      firstName
      lastName
      phoneNumber
      emailAddress
      companyName
      status
    }
  }
`;

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
    }
  }
`;

const UPDATE_CLIENT = gql`
  mutation UpdateClient(
    $id: ID!
    $organizationId: ID!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String
    $emailAddress: String
    $companyName: String
    $status: ClientStatusUpdate
  ) {
    updateClient(
      id: $id
      organizationId: $organizationId
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      emailAddress: $emailAddress
      companyName: $companyName
      status: $status
    ) {
      id
      firstName
      lastName
      phoneNumber
      emailAddress
      companyName
      status
    }
  }
`;

export { ADD_CLIENT, DELETE_CLIENT, UPDATE_CLIENT };
