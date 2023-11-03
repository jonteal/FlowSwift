import { gql } from "@apollo/client";

const GET_SERVICES = gql`
  query getServices($projectId: ID) {
    services(projectId: $projectId) {
      id
      service
      cost
      notes
      serviceProvider
      paymentSchedule
      status
      project {
        id
        title
      }
      createdAt
      startDate
      endDate
    }
  }
`;

const GET_SERVICE = gql`
  query getService($id: ID) {
    service(id: $id) {
      id
      service
      cost
      notes
      serviceProvider
      paymentSchedule
      status
      project {
        id
        title
      }
      createdAt
      startDate
      endDate
    }
  }
`;

export { GET_SERVICES, GET_SERVICE };
