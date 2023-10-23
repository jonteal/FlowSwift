import { gql } from "@apollo/client";

const ADD_SERVICE = gql`
  mutation AddService(
    $service: String!
    $cost: String!
    $notes: String
    $serviceProvider: ServiceProvider!
    $paymentSchedule: ServicePaymentSchedule!
    $status: ServiceStatus!
    $projectId: ID!
    $startDate: String
    $endDate: String
  ) {
    addService(
      service: $service
      cost: $cost
      notes: $notes
      serviceProvider: $serviceProvider
      paymentSchedule: $paymentSchedule
      status: $status
      projectId: $projectId
      startDate: $startDate
      endDate: $endDate
    ) {
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
      startDate
      endDate
      createdAt
    }
  }
`;

const DELETE_SERVICE = gql`
  mutation DeleteService($id: ID!) {
    deleteService(id: $id) {
      id
    }
  }
`;

const UPDATE_SERVICE = gql`
  mutation UpdateService(
    $id: ID!
    $service: String
    $cost: String
    $serviceProvider: ServiceProviderUpdate
    $notes: String
    $paymentSchedule: ServicePaymentScheduleUpdate
    $status: ServiceStatusUpdate
    $startDate: String
    $endDate: String
  ) {
    updateProject(
      id: $id
      service: $service
      cost: $cost
      serviceProvider: $serviceProvider
      notes: $notes
      paymentSchedule: $paymentSchedule
      status: $status
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      service
      cost
      serviceProvider
      notes
      paymentSchedule
      status
      project {
        id
        title
      }
      startDate
      endDate
      createdAt
    }
  }
`;

export { ADD_SERVICE, UPDATE_SERVICE, DELETE_SERVICE };
