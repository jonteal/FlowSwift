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
    $userId: ID
  ) {
    addTicket(
      title: $title
      typeOfTicket: $typeOfTicket
      description: $description
      status: $status
      blocked: $blocked
      blockedReason: $blockedReason
      projectId: $projectId
      userId: $userId
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
    $blocked: Boolean
    $blockedReason: String
    $status: TicketStatusUpdate
    $userId: ID
  ) {
    updateTicket(
      id: $id
      title: $title
      typeOfTicket: $typeOfTicket
      description: $description
      blocked: $blocked
      blockedReason: $blockedReason
      status: $status
      userId: $userId
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
      user {
        _id
        name
      }
      createdAt
    }
  }
`;

export { ADD_TICKET, DELETE_TICKET, UPDATE_TICKET };
