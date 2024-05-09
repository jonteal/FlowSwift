import { gql } from "graphql-tag";

export const ADD_CLIENT_ACTIVITY_COMMENT = gql`
  mutation addClientActivityComment(
    $commentText: String!
    $clientId: ID!
    $userId: ID
  ) {
    addClientActivityComment(
      commentText: $commentText
      clientId: $clientId
      userId: $userId
    ) {
      id
      commentText
      createdAt
      client {
        id
        firstName
        lastName
      }
      user {
        _id
        name
      }
    }
  }
`;

export const DELETE_CLIENT_ACTIVITY_COMMENT = gql`
  mutation DeleteClientActivityComment($id: ID!) {
    deleteClientActivityComment(id: $id) {
      id
    }
  }
`;

export const UPDATE_CLIENT_ACTIVITY_COMMENT = gql`
  mutation UpdateClientActivityComment(
    $commentText: String!
    $clientId: ID!
    $userId: ID
  ) {
    updateClientActivityComment(
      commentText: $commentText
      clientId: $clientId
      userId: $userId
    ) {
      id
      commentText
      createdAt
      clientId {
        id
      }
      user {
        _id
        name
      }
    }
  }
`;
