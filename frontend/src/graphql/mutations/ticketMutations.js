import { gql } from "@apollo/client";

const ADD_TICKET = gql`
  mutation AddTicket(
    $title: String!
    $typeOfTicket: TypeOfTicket!
    $description: String!
    $status: TicketStatus!
    $blocked: Boolean!
    $blockedReason: String
    $projectId: ID!
  ) {
    addTicket(
      title: $title
      typeOfTicket: $typeOfTicket
      description: $description
      status: $status
      blocked: $blocked
      blockedReason: $blockedReason
      projectId: $projectId
    ) {
      id
      title
      typeOfTicket
      description
      status
      blocked
      blockedReason
      project {
        id
      }
      createdAt
    }
  }
`;

const DELETE_TICKET = gql`
  mutation DeleteTicket($id: ID!) {
    deleteTicket(id: $id) {
      id
    }
  }
`;

const UPDATE_TICKET = gql`
  mutation UpdateTicket(
    $id: ID!
    $title: String
    $typeOfTicket: TypeOfTicketUpdate
    $description: String
    $blocked: Boolean
    $blockedReason: String
    $status: TicketStatusUpdate
  ) {
    updateTicket(
      id: $id
      title: $title
      typeOfTicket: $typeOfTicket
      description: $description
      blocked: $blocked
      blockedReason: $blockedReason
      status: $status
    ) {
      id
      title
      typeOfTicket
      description
      blocked
      blockedReason
      status
      project {
        id
      }
      createdAt
    }
  }
`;

export { ADD_TICKET, DELETE_TICKET, UPDATE_TICKET };
