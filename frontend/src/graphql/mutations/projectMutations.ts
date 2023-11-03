import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
  mutation AddProject(
    $title: String!
    $description: String!
    $status: ProjectStatus!
    $notes: String
    $clientId: ID!
    $startDate: String
    $deadline: String
    $clientBudget: String
    $projectEstimate: String
  ) {
    addProject(
      title: $title
      description: $description
      status: $status
      notes: $notes
      clientId: $clientId
      startDate: $startDate
      deadline: $deadline
      clientBudget: $clientBudget
      projectEstimate: $projectEstimate
    ) {
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
    $notes: String
    $startDate: String
    $deadline: String
    $clientBudget: String
    $projectEstimate: String
  ) {
    updateProject(
      id: $id
      title: $title
      description: $description
      status: $status
      notes: $notes
      startDate: $startDate
      deadline: $deadline
      clientBudget: $clientBudget
      projectEstimate: $projectEstimate
    ) {
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
      startDate
      deadline
      clientBudget
      projectEstimate
      createdAt
    }
  }
`;

export { ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT };
