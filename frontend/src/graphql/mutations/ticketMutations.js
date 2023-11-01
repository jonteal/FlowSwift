import { gql } from "@apollo/client";

const ADD_TICKET = gql`
  mutation AddTicket(
    $title: String!
    $typeOfTicket: TypeOfTicket!
    $description: String
    $size: String
    $status: String
    $blocked: Boolean!
    $blockedReason: String
    $ready: Boolean
    $kanbanId: ID!
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
      kanbanId: $kanbanId
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
      kanban {
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
    $kanbanId: ID!
    $status: String
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
      kanbanId: $kanbanId
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
      kanban {
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
