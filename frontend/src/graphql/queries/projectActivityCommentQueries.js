import { gql } from "@apollo/client";

const GET_PROJECT_ACTIVITY_COMMENTS = gql`
  query getProjectActivityComments($projectId: ID) {
    projectActivityComments(projectId: $projectId) {
      id
      commentText
      createdAt
      project {
        id
        client {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

const GET_PROJECT_ACTIVITY_COMMENT = gql`
  query getProjectActivityComment($id: ID) {
    projectActivityComment(id: $id) {
      id
      commentText
      createdAt
      project {
        id
        client {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export { GET_PROJECT_ACTIVITY_COMMENTS, GET_PROJECT_ACTIVITY_COMMENT };
