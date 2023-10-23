import { gql } from "@apollo/client";

const GET_CLIENT_ACTIVITY_COMMENT_REPLIES = gql`
  query getClientActivityCommentReplies($commentId: ID) {
    clientActivityCommentReplies(commentId: $commentId) {
      id
      commentText
      createdAt
      clientActivityComment {
        id
      }
    }
  }
`;

const GET_CLIENT_ACTIVITY_COMMENT_REPLY = gql`
  query getClientActivityCommentReply($id: ID) {
    clientActivityCommentReply(id: $id) {
      id
      commentText
      createdAt
      clientActivityComment {
        id
      }
    }
  }
`;

export {
  GET_CLIENT_ACTIVITY_COMMENT_REPLIES,
  GET_CLIENT_ACTIVITY_COMMENT_REPLY,
};
