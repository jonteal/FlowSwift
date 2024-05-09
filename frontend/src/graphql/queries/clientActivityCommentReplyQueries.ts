import { gql } from 'graphql-tag';

export const GET_CLIENT_ACTIVITY_COMMENT_REPLIES = gql`
  query getClientActivityCommentReplies($commentId: ID) {
    clientActivityCommentReplies(commentId: $commentId) {
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

export const GET_CLIENT_ACTIVITY_COMMENT_REPLY = gql`
  query getClientActivityCommentReply($id: ID) {
    clientActivityCommentReply(id: $id) {
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
