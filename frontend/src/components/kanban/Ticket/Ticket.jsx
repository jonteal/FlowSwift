import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";

// ICONS
import { AiOutlineStop } from "react-icons/ai";
import { IoIosBug } from "react-icons/io";
import { BsBookFill } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";

// GRAPHQL
import {
  DELETE_TICKET,
  UPDATE_TICKET,
} from "../../../graphql/mutations/ticketMutations";
import { GET_TICKETS } from "../../../graphql/queries/ticketQueries";

// STATE
import { ThemeContext } from "../../../context";
import { useSelector } from "react-redux";
import { DynamicInput } from "../../reusable/DynamicInput/DynamicInput";
import { DynamicButton } from "../../reusable/DynamicButton/DynamicButton";
import { UnblockTicketModal } from "../../modals/UnblockTicketModal/UnblockTickModal";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const Ticket = ({ ticket }) => {
  const { kanbanId, clientId, projectId } = useParams();

  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const {
    size,
    description: ticketDescription,
    createdDate,
    owner,
  } = useSelector((state) => state.ticket);

  const [title, setTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.title);
  const [status, setStatus] = useState(ticket.status);
  const [blocked, setBlocked] = useState(ticket.blocked);
  const [blockedReason, setBlockedReason] = useState(ticket.blockedReason);
  const [ready, setReady] = useState(ticket.ready);
  const [userId, setUserId] = useState(ticket.userId);
  const [ticketId, setTicketId] = useState(ticket.id);
  const [editBlockedReason, setEditBlockedReason] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [updateTicket] = useMutation(UPDATE_TICKET, {
    variables: {
      id: ticketId,
      title,
      description,
      blocked,
      kanbanId,
      status,
      blockedReason,
      userId,
    },
    refetchQueries: [{ query: GET_TICKETS, variables: { kanbanId } }],
    update(cache, { data: { updateTicket } }) {
      const { tickets } = cache.readQuery({
        query: GET_TICKETS,
        variables: { kanbanId },
      });
      cache.writeQuery({
        query: GET_TICKETS,
        variables: { kanbanId },
        data: { tickets: [...tickets, updateTicket] },
      });
    },
  });

  const handleBlockTicket = () => {
    if (blocked) {
      setShow(true);
      setBlocked(false);
      setBlockedReason("");
      setEditBlockedReason(false);
    } else {
      setEditBlockedReason(true);
      setBlocked(true);
      setReady(false);
    }
  };

  const handleTicketReady = () => {
    setReady(!ready);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (blockedReason === "") {
      setBlockedReason("Blocked");
    }

    updateTicket(
      ticketId,
      title,
      description,
      kanbanId,
      status,
      blocked,
      blockedReason,
      userId
    );
    setEditBlockedReason(false);
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
              ready ? "bg-green-600" : "bg-slate-200"
            } rounded-full mr-3`}
          >
            <AiOutlineCheckCircle
              className={`${ready ? "text-slate-50" : "text-slate-700"}`}
            />
          </button>
          <button
            onClick={handleBlockTicket}
            className={`border ${
              blocked ? "bg-red-600" : "bg-red-50"
            } rounded-full mr-3`}
          >
            <AiOutlineStop
              className={`${blocked ? "text-slate-50" : "text-slate-700"}`}
            />
          </button>
          <Link
            className="mr-2"
            to={`/clients/${clientId}/projects/${projectId}/kanbans/${kanbanId}/${ticket.id}`}
          >
            <span className="text-sm">View</span>
          </Link>
          <button onClick={deleteTicket}>
            <FaRegTrashAlt className="text-red-500" />
          </button>
        </div>
      </div>
      <p
        className={`${
          darkMode ? "text-slate-50" : "text-sky-900"
        } font-bold text-base  text-left my-2`}
      >
        {ticket.title}
      </p>
      {ticketDescription && (
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

      {editBlockedReason && (
        <form onSubmit={onSubmit} className="flex flex-col">
          <DynamicInput
            id="edit-block-input"
            inputType="textarea"
            label="Blocked Reason"
            changeHandler={(e) => setBlockedReason(e.target.value)}
            placeholder="Reason story is blocked"
            value={blockedReason}
            rows="3"
            ariaLabel="Block story input"
          />
          <DynamicButton type="submit" color="blue">
            Save
          </DynamicButton>
        </form>
      )}

      {blocked && !editBlockedReason && (
        <div className="bg-red-500 text-slate-50 text-sm rounded-2xl mt-2 py-1">
          {ticket.blockedReason || "Blocked"}
        </div>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        {/* <Modal.Header closeButton>
        <Modal.Title>Delete=== {subject}</Modal.Title>
      </Modal.Header> */}
        <Modal.Body>{`Unblock ticket?`}</Modal.Body>
        <Modal.Footer>
          <Button
            className="border bg-slate-500"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
          <form onSubmit={onSubmit}>
            <DynamicButton
              clickHandler={handleClose}
              color="blue"
              type="submit"
            >
              Yes
            </DynamicButton>
          </form>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
