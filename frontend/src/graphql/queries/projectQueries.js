import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      title
      description
      status
      notes
      client {
        id
        firstName
        lastName
      }
      createdAt
      startDate
      deadline
      clientBudget
      projectEstimate
      user {
        _id
        name
      }
    }
  }
`;

const GET_CLIENT_PROJECTS = gql`
  query getProjects($clientId: ID) {
    clientProjects(clientId: $clientId) {
      id
      title
      description
      status
      notes
      client {
        id
        firstName
        lastName
      }
      user {
        _id
        name
      }
      createdAt
      startDate
      deadline
      clientBudget
      projectEstimate
    }
  }
`;

const GET_PROJECT = gql`
  query getProject($id: ID) {
    project(id: $id) {
      id
      title
      description
      status
      notes
      client {
        id
        firstName
        lastName
      }
      user {
        _id
        name
      }
      createdAt
      startDate
      deadline
      clientBudget
      projectEstimate
    }
  }
`;

export { GET_PROJECTS, GET_CLIENT_PROJECTS, GET_PROJECT };
