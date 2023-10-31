import { gql } from "@apollo/client";

const ADD_TICKET = gql`
  mutation AddTicket(
    $title: String!
    $typeOfTicket: TypeOfTicket!
    $description: String
    $size: String
    $status: TicketStatus!
    $blocked: Boolean!
    $blockedReason: String
    $ready: Boolean
    $projectId: ID!
    $userId: ID
  ) {
    addTicket(
      title: $title
      typeOfTicket: $typeOfTicket
      description: $description
      size: $size
      status: $status
      blocked: $blocked
      blockedReason: $blockedReason
      ready: $ready
      projectId: $projectId
      userId: $userId
    ) {
      id
      title
      typeOfTicket
      description
      size
      status
      blocked
      blockedReason
      ready
      project {
        id
      }
      user {
        _id
        name
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
    $size: String
    $blocked: Boolean
    $blockedReason: String
    $ready: Boolean
    $status: TicketStatusUpdate
    $userId: ID
  ) {
    updateTicket(
      id: $id
      title: $title
      typeOfTicket: $typeOfTicket
      description: $description
      size: $size
      blocked: $blocked
      ready: $ready
      blockedReason: $blockedReason
      status: $status
      userId: $userId
    ) {
      id
      title
      typeOfTicket
      description
      size
      status
      blocked
      blockedReason
      ready
      project {
        id
      }
      user {
        _id
        name
      }
      createdAt
    }
  }
`;

export { ADD_TICKET, DELETE_TICKET, UPDATE_TICKET };
