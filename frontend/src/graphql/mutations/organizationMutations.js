import { gql } from "@apollo/client";

const ADD_ORGANIZATION = gql`
  mutation AddOrganization($organizationName: String!, $userId: ID!) {
    addOrganization(organizationName: $organizationName, userId: $userId) {
      id
      organizationName
      user {
        _id
        name
        email
        organization
      }
    }
  }
`;

const DELETE_ORGANIZATION = gql`
  mutation DeleteOrganization($id: ID!) {
    deleteOrganization(id: $id) {
      id
    }
  }
`;

const UPDATE_ORGANIZATION = gql`
  mutation UpdateOrganization(
    $id: ID!
    $organizationName: String
    $userId: String!
  ) {
    updateOrganization(
      id: $id
      organizationName: $organizationName
      userId: $userId
    ) {
      id
      organizationName
      user {
        _id
        name
        email
        organization
      }
    }
  }
`;

export { ADD_ORGANIZATION, UPDATE_ORGANIZATION, DELETE_ORGANIZATION };
