import { gql } from "@apollo/client";

const ADD_CLIENT_ACTIVITY_COMMENT = gql`
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

const DELETE_CLIENT_ACTIVITY_COMMENT = gql`
  mutation DeleteClientActivityComment($id: ID!) {
    deleteClientActivityComment(id: $id) {
      id
    }
  }
`;

const UPDATE_CLIENT_ACTIVITY_COMMENT = gql`
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

export {
  ADD_CLIENT_ACTIVITY_COMMENT,
  UPDATE_CLIENT_ACTIVITY_COMMENT,
  DELETE_CLIENT_ACTIVITY_COMMENT,
};
