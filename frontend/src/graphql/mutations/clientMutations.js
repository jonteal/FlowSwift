import { gql } from "@apollo/client";

const ADD_CLIENT = gql`
  mutation addClient(
    $userId: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String
    $emailAddress: String
    $companyName: String
    $status: ClientStatus!
  ) {
    addClient(
      userId: $userId
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
      user {
        _id
        name
        email
      }
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
    $userId: ID!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String
    $emailAddress: String
    $companyName: String
    $status: ClientStatusUpdate
  ) {
    updateClient(
      id: $id
      userId: $userId
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      emailAddress: $emailAddress
      companyName: $companyName
      status: $status
    ) {
      id
      user {
        _id
        name
        email
      }
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
