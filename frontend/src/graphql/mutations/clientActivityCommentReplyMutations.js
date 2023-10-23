import { gql } from "@apollo/client";

const ADD_CLIENT_ACTIVITY_COMMENT_REPLY = gql`
  mutation addClientActivityCommentReply(
    $commentText: String!
    $commentId: ID!
  ) {
    addClientActivityCommentReply(
      commentText: $commentText
      commentId: $commentId
    ) {
      id
      commentText
      createdAt
      clientActivityComment {
        id
      }
    }
  }
`;

const DELETE_CLIENT_ACTIVITY_COMMENT_REPLY = gql`
  mutation DeleteClientActivityCommentReply($id: ID!) {
    deleteClientActivityCommentReply(id: $id) {
      id
    }
  }
`;

const UPDATE_CLIENT_ACTIVITY_COMMENT_REPLY = gql`
  mutation UpdateClientActivityCommentReply(
    $commentText: String!
    $createdAt: String!
    $commentId: ID!
  ) {
    updateClientActivityCommentReply(
      commentText: $commentText
      commentId: $commentId
    ) {
      id
      commentText
      createdAt
      commentId {
        id
      }
    }
  }
`;

export {
  ADD_CLIENT_ACTIVITY_COMMENT_REPLY,
  UPDATE_CLIENT_ACTIVITY_COMMENT_REPLY,
  DELETE_CLIENT_ACTIVITY_COMMENT_REPLY,
};
