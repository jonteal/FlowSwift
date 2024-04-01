import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
  mutation AddProject(
    $title: String!
    $description: String!
    $status: ProjectStatus!
    $priority: ProjectPriority
    $notes: String
    $clientId: ID!
    $startDate: String
    $deadline: String
    $clientBudget: String
    $projectEstimate: String
    $userId: ID
    $organizationId: ID!
  ) {
    addProject(
      title: $title
      description: $description
      status: $status
      priority: $priority
      notes: $notes
      clientId: $clientId
      startDate: $startDate
      deadline: $deadline
      clientBudget: $clientBudget
      projectEstimate: $projectEstimate
      userId: $userId
      organizationId: $organizationId
    ) {
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
      startDate
      deadline
      clientBudget
      projectEstimate
      createdAt
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: ID!
    $title: String
    $description: String
    $status: ProjectStatusUpdate
    $priority: ProjectPriorityUpdate
    $notes: String
    $startDate: String
    $deadline: String
    $clientBudget: String
    $projectEstimate: String
    $userId: ID
    $organizationId: ID!
  ) {
    updateProject(
      id: $id
      title: $title
      description: $description
      status: $status
      priority: $priority
      notes: $notes
      startDate: $startDate
      deadline: $deadline
      clientBudget: $clientBudget
      projectEstimate: $projectEstimate
      userId: $userId
      organizationId: $organizationId
    ) {
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
      startDate
      deadline
      clientBudget
      projectEstimate
      createdAt
    }
  }
`;

export { ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT };
