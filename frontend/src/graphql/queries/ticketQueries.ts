import { gql } from "graphql-tag";

export const GET_TICKETS = gql`
  query getTickets($kanbanId: ID) {
    tickets(kanbanId: $kanbanId) {
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

export const GET_TICKET = gql`
  query getTicket($id: ID) {
    ticket(id: $id) {
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

