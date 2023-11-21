import { gql } from "@apollo/client";

const GET_USERS = gql`
  query getUsers($organizationId: ID!) {
    users(organizationId: $organizationId) {
      _id
      name
      email
      organizationId
      role
      manager
      managerId
    }
  }
`;

const GET_USER = gql`
  query getUser($id: ID) {
    user(id: $id) {
      _id
      name
      email
      organizationId
      role
      manager
      managerId
    }
  }
`;

export { GET_USERS, GET_USER };
