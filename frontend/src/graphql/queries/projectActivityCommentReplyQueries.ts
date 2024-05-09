import { gql } from "graphql-tag";

export const GET_PROJECT_ACTIVITY_COMMENT_REPLIES = gql`
  query getProjectActivityCommentReplies($commentId: ID) {
    projectActivityCommentReplies(commentId: $commentId) {
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

export const GET_PROJECT_ACTIVITY_COMMENT_REPLY = gql`
  query getProjectActivityCommentReply($id: ID) {
    projectActivityCommentReply(id: $id) {
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
