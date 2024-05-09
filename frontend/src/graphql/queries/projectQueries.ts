import gql from 'graphql-tag'

export const GET_ORGANIZATION_PROJECTS = gql`
  query getProjects($organizationId: ID) {
    organizationProjects(organizationId: $organizationId) {
      id
      title
      description
      status
      priority
      notes
      client {
        id
        firstName
        lastName
      }
      organization {
        id
        organizationName
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

export const GET_CLIENT_PROJECTS = gql`
  query getProjects($clientId: ID) {
    clientProjects(clientId: $clientId) {
      id
      title
      description
      status
      priority
      notes
      client {
        id
        firstName
        lastName
      }
      organization {
        id
        organizationName
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

export const GET_PROJECT = gql`
  query getProject($id: ID) {
    project(id: $id) {
      id
      title
      description
      status
      priority
      notes
      client {
        id
        firstName
        lastName
      }
      organization {
        id
        organizationName
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

