import { gql } from "@apollo/client";

const GET_TICKETS = gql`
  query getTickets($projectId: ID) {
    tickets(projectId: $projectId) {
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

const GET_TICKET = gql`
  query getTicket($id: ID) {
    ticket(id: $id) {
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

export { GET_TICKETS, GET_TICKET };
