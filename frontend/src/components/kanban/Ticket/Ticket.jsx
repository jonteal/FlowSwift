import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";

// ICONS
import { AiOutlineStop } from "react-icons/ai";
import { IoIosBug } from "react-icons/io";
import { BsBookFill } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";

// GRAPHQL
import { DELETE_TICKET } from "../../../graphql/mutations/ticketMutations";
import { GET_TICKETS } from "../../../graphql/queries/ticketQueries";

import { ThemeContext } from "../../../context";
import { useSelector } from "react-redux";

export const Ticket = ({ ticket }) => {
  const { kanbanId } = useParams();
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const { size, description, createdDate, owner } = useSelector(
    (state) => state.ticket
  );

  const { clientId, projectId } = useParams();
  const [isBlocked, setIsBlocked] = useState(ticket.blocked);
  const [isReady, setIsReady] = useState(ticket.ready);

  const handleBlockTicket = () => {
    setIsBlocked(!isBlocked);
  };

  const handleTicketReady = () => {
    setIsReady(!isReady);
  };

  const [deleteTicket] = useMutation(DELETE_TICKET, {
    variables: { id: ticket.id },
    refetchQueries: [{ query: GET_TICKETS, variables: { kanbanId } }],
  });

  return (
    <div
      className={`${
        darkMode ? "border-sky-100 bg-sky-950" : "border-slate-600 bg-slate-50"
      }  rounded-lg p-3 my-3 mx-auto w-11/12 h-auto shadow-md text-center`}
    >
      <div className="flex flex-row w-full justify-between items-center mb-3">
        <div
          className={`${
            ticket.typeOfTicket === "Defect" ? "bg-orange-500" : "bg-sky-500"
          } p-1 rounded-full`}
        >
          {ticket.typeOfTicket === "Defect" ? (
            <IoIosBug className="text-slate-50" />
          ) : (
            <BsBookFill className="text-slate-50" />
          )}
        </div>
        <div>
          <button
            onClick={handleTicketReady}
            className={`border ${
              isReady ? "bg-green-600" : "bg-slate-200"
            } rounded-full mr-3`}
          >
            <AiOutlineCheckCircle
              className={`${isReady ? "text-slate-50" : "text-slate-700"}`}
            />
          </button>
          <button
            onClick={handleBlockTicket}
            className={`border ${
              isBlocked ? "bg-red-600" : "bg-red-50"
            } rounded-full mr-3`}
          >
            <AiOutlineStop
              className={`${isBlocked ? "text-slate-50" : "text-slate-700"}`}
            />
          </button>
          <Link
            className="mr-2"
            to={`/clients/${clientId}/projects/${projectId}/kanban/${ticket.id}`}
          >
            <span className="text-sm">View</span>
          </Link>
          <button onClick={deleteTicket}>
            <FaRegTrashAlt className="text-red-500" />
          </button>
        </div>
      </div>
      <p className="font-bold text-base text-sky-900 text-left my-2">
        {ticket.title}
      </p>
      {description && (
        <p className="text-left text-base my-2">{ticket.description}</p>
      )}

      {size && (
        <div className="bg-sky-300 w-10 flex flex-row justify-center items-center rounded-sm">
          <p className="text-left my-2 py-0 font-semibold text-sky-900 self-center text-base">
            {ticket.size}
          </p>
        </div>
      )}

      {owner && (
        <div className="flex flex-col">
          <p className="text-left text-sm mt-2 font-light">Owned by:</p>
          <p className="text-left text-sm my-0 font-semibold">
            {ticket.user.name}
          </p>
        </div>
      )}
      {createdDate && (
        <p className="text-left text-sm my-2">Created: {ticket.createdAt}</p>
      )}
      {isBlocked && (
        <div className="bg-red-500 text-slate-50 text-sm rounded-2xl mt-2 py-1">
          {ticket.blockedReason || "Blocked"}
        </div>
      )}
    </div>
  );
};
