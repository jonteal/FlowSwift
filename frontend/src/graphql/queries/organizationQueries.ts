import { gql } from "@apollo/client";

const GET_ORGANIZATIONS = gql`
  query getOrganizations($userId: ID) {
    organizations(userId: $userId) {
      id
      organizationName
      user {
        _id
        name
        email
        organizationId
      }
    }
  }
`;

const GET_ORGANIZATION = gql`
  query getOrganization($id: ID) {
    organization(id: $id) {
      id
      organizationName
      user {
        _id
        name
        email
        organizationId
      }
    }
  }
`;

export { GET_ORGANIZATIONS, GET_ORGANIZATION };
