import { gql } from "graphql-tag";

export const ADD_PROJECT_ACTIVITY_COMMENT_REPLY = gql`
  mutation addProjectActivityCommentReply(
    $commentText: String!
    $commentId: ID!
    $userId: ID
  ) {
    addProjectActivityCommentReply(
      commentText: $commentText
      commentId: $commentId
      userId: $userId
    ) {
      id
      commentText
      createdAt
      projectActivityComment {
        id
      }
      user {
        _id
        name
      }
    }
  }
`;

export const DELETE_PROJECT_ACTIVITY_COMMENT_REPLY = gql`
  mutation DeleteProjectActivityCommentReply($id: ID!) {
    deleteProjectActivityCommentReply(id: $id) {
      id
    }
  }
`;

export const UPDATE_PROJECT_ACTIVITY_COMMENT_REPLY = gql`
  mutation UpdateProjectActivityCommentReply(
    $commentText: String!
    $createdAt: String!
    $commentId: ID!
    $userId: ID
  ) {
    updateProjectActivityCommentReply(
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
