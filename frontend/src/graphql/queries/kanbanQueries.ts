import gql from 'graphql-tag'

export const GET_ALL_KANBANS = gql`
  query getAllKanbans($organizationId: ID) {
    allKanbans(organizationId: $organizationId) {
      id
      title
      description
      project {
        id
        title
        client {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export const GET_KANBANS = gql`
  query getKanbans($projectId: ID) {
    kanbans(projectId: $projectId) {
      id
      title
      description
      project {
        id
        title
        client {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export const GET_KANBAN = gql`
  query getKanban($id: ID) {
    kanban(id: $id) {
      id
      title
      description
      project {
        id
        title
        client {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

