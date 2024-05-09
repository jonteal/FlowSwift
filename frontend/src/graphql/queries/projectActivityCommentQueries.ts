import gql from 'graphql-tag'

export const GET_PROJECT_ACTIVITY_COMMENTS = gql`
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
      user {
        _id
        name
      }
    }
  }
`;

export const GET_PROJECT_ACTIVITY_COMMENT = gql`
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
      user {
        _id
        name
      }
    }
  }
`;

