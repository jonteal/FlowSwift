import { gql } from "graphql-tag";

export const ADD_CLIENT_ACTIVITY_COMMENT_REPLY = gql`
  mutation addClientActivityCommentReply(
    $commentText: String!
    $commentId: ID!
    $userId: ID
  ) {
    addClientActivityCommentReply(
      commentText: $commentText
      commentId: $commentId
      userId: $userId
    ) {
      id
      commentText
      createdAt
      clientActivityComment {
        id
      }
      user {
        _id
        name
      }
    }
  }
`;

export const DELETE_CLIENT_ACTIVITY_COMMENT_REPLY = gql`
  mutation DeleteClientActivityCommentReply($id: ID!) {
    deleteClientActivityCommentReply(id: $id) {
      id
    }
  }
`;

export const UPDATE_CLIENT_ACTIVITY_COMMENT_REPLY = gql`
  mutation UpdateClientActivityCommentReply(
    $commentText: String!
    $createdAt: String!
    $commentId: ID!
    $userId: ID
  ) {
    updateClientActivityCommentReply(
      commentText: $commentText
      commentId: $commentId
      userId: $userId
    ) {
      id
      commentText
      createdAt
      commentId {
        id
      }
      user {
        _id
        name
      }
    }
  }
`;
