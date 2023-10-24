import { gql } from "@apollo/client";

const GET_ORGANIZATIONS = gql`
  query getOrganizations {
    organizations {
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

const GET_ORGANIZATION = gql`
  query getOrganization($id: ID) {
    organization(id: $id) {
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

export { GET_ORGANIZATIONS, GET_ORGANIZATION };
