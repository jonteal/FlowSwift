import { gql } from "@apollo/client";

const ADD_PROJECT_ACTIVITY_COMMENT_REPLY = gql`
  mutation addProjectActivityCommentReply(
    $commentText: String!
    $commentId: ID!
  ) {
    addProjectActivityCommentReply(
      commentText: $commentText
      commentId: $commentId
    ) {
      id
      commentText
      createdAt
      projectActivityComment {
        id
      }
    }
  }
`;

const DELETE_PROJECT_ACTIVITY_COMMENT_REPLY = gql`
  mutation DeleteProjectActivityCommentReply($id: ID!) {
    deleteProjectActivityCommentReply(id: $id) {
      id
    }
  }
`;

const UPDATE_PROJECT_ACTIVITY_COMMENT_REPLY = gql`
  mutation UpdateProjectActivityCommentReply(
    $commentText: String!
    $createdAt: String!
    $commentId: ID!
  ) {
    updateProjectActivityCommentReply(
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
  ADD_PROJECT_ACTIVITY_COMMENT_REPLY,
  UPDATE_PROJECT_ACTIVITY_COMMENT_REPLY,
  DELETE_PROJECT_ACTIVITY_COMMENT_REPLY,
};
