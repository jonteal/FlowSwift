import { gql } from 'graphql-tag';

export const ADD_PROJECT_ACTIVITY_COMMENT = gql`
  mutation addProjectActivityComment(
    $commentText: String!
    $projectId: ID!
    $userId: ID
  ) {
    addProjectActivityComment(
      commentText: $commentText
      projectId: $projectId
      userId: $userId
    ) {
      id
      commentText
      createdAt
      project {
        id
        title
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

export const DELETE_PROJECT_ACTIVITY_COMMENT = gql`
  mutation DeleteProjectActivityComment($id: ID!) {
    deleteProjectActivityComment(id: $id) {
      id
    }
  }
`;

export const UPDATE_PROJECT_ACTIVITY_COMMENT = gql`
  mutation UpdateProjectActivityComment(
    $id: ID!
    $commentText: String!
    $projectId: ID!
    $userId: ID
  ) {
    updateProjectActivityComment(
      id: $id
      commentText: $commentText
      projectId: $projectId
      userId: $userId
    ) {
      id
      commentText
      createdAt
      project {
        id
        title
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
