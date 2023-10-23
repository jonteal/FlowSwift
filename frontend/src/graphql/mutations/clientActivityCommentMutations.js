import { gql } from "@apollo/client";

const ADD_CLIENT_ACTIVITY_COMMENT = gql`
  mutation addClientActivityComment($commentText: String!, $clientId: ID!) {
    addClientActivityComment(commentText: $commentText, clientId: $clientId) {
      id
      commentText
      createdAt
      client {
        id
        firstName
        lastName
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
    $createdAt: String!
    $clientId: ID!
  ) {
    updateClientActivityComment(
      commentText: $commentText
      clientId: $clientId
    ) {
      id
      commentText
      createdAt
      clientId {
        id
      }
    }
  }
`;

export {
  ADD_CLIENT_ACTIVITY_COMMENT,
  UPDATE_CLIENT_ACTIVITY_COMMENT,
  DELETE_CLIENT_ACTIVITY_COMMENT,
};
