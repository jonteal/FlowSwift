import { gql } from "@apollo/client";

const GET_USERS = gql`
  query getUsers($organizationId: ID) {
    users(organizationId: $organizationId) {
      id
      name
      email
      organization
    }
  }
`;

const GET_USER = gql`
  query getUser($id: ID) {
    user(id: $id) {
      id
      name
      email
      organization
    }
  }
`;

export { GET_USERS, GET_USER };
