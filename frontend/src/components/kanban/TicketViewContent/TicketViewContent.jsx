import { useMutation } from "@apollo/client";

// ICONS
import { FaCheckCircle } from "react-icons/fa";
import { SiAdblock } from "react-icons/si";

// GRAPHQL
import { UPDATE_TICKET } from "../../../graphql/mutations/ticketMutations";
import { GET_TICKET } from "../../../graphql/queries/ticketQueries";

// COMPONENTS
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DynamicButton } from "../../reusable/DynamicButton/DynamicButton";
import { NameValuePair } from "../../reusable/NameValuePair/NameValuePair";

// STATE
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const TicketViewContent = ({
  ticket,
  userInfo,
  kanbanStatusColumnData,
}) => {
  const { ticketId, kanbanId } = useParams();
  const { darkMode } = useSelector((state) => state.theme);

  const [blocked, setBlocked] = useState(ticket.blocked);
  const [blockedReason, setBlockedReason] = useState(ticket.blockedReason);
  const [ready, setReady] = useState(ticket.ready);
  const [title, setTitle] = useState(ticket.title);
  const [status, setStatus] = useState(ticket.status);
  const [description, setDescription] = useState(ticket.description);
  const [createdAt, setCreatedAt] = useState(ticket.createdAt);
  // const [ticketId, setTicketId] = useState(ticket.id);
  const [editBlockedReason, setEditBlockedReason] = useState(false);
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(userInfo._id);
  const [actionType, setActionType] = useState(false);

  const handleClose = () => setShow(false);

  const handleNoSubmitModalClose = () => {
    if (ready === true) {
      setReady(true);
    } else if (ready === true) {
      setReady(false);
    } else if (blocked === true) {
      setBlocked(true);
      setReady(false);
    }
    setShow(false);
  };

  const [updateTicket] = useMutation(UPDATE_TICKET, {
    variables: {
      id: ticketId,
      title,
      description,
      kanbanId,
      status,
      blocked,
      blockedReason,
      userId,
      ready,
    },
    refetchQueries: [{ query: GET_TICKET, variables: { ticketId } }],
    update(cache, { data: { updateTicket } }) {
      const { ticket } = cache.readQuery({
        query: GET_TICKET,
        variables: { ticketId },
      });
      cache.writeQuery({
        query: GET_TICKET,
        variables: { ticketId },
        data: { ticket: [...ticket, updateTicket] },
      });
    },
  });

  const handleBlockTicket = () => {
    if (blocked) {
      setShow(true);
      setBlocked(false);
      setBlockedReason("");
      setEditBlockedReason(false);
      setActionType("unblock");
    } else {
      setEditBlockedReason(true);
      setBlocked(true);
      setReady(false);
      setActionType("block");
    }
  };

  const handleTicketReady = () => {
    setShow(true);
    setBlocked(false);
    setReady(!ready);
    setBlockedReason("");
    if (ready) {
      setActionType("notReady");
    } else {
      setActionType("ready");
    }
  };

  const renderModalBody = () => {
    switch (actionType) {
      case "unblock":
        return "Unblock ticket?";
      case "block":
        return "Block ticket?";
      case "notReady":
        return "Ticket is not ready.";
      case "ready":
        return "Ticket is ready.";
      default:
        break;
    }
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
      userId,
      ready
    );
    setEditBlockedReason(false);
  };

  const ticketStatus = kanbanStatusColumnData.kanbanStatusColumns.find(
    (column) => column.id === status
  );

  return (
    <div className="flex flex-col items-start justify-start mt-3 w-full">
      <h3>Status</h3>
      <div className="flex flex-row mt-2 items-center">
        <button
          onClick={handleTicketReady}
          className={`${
            ready ? "bg-green-500 text-slate-50" : ""
          } mr-3 border py-2 px-4 flex flex-row items-center cursor-pointer`}
        >
          <FaCheckCircle className="mr-2" />
          Ready
        </button>
        <button
          onClick={handleBlockTicket}
          className={`${
            blocked ? "bg-red-500 text-slate-50" : ""
          } border py-2 px-4 flex flex-row items-center cursor-pointer`}
        >
          <SiAdblock className="mr-2" />
          Blocked
        </button>
        {blockedReason && (
          <p className="border-red-500 ml-3 p-2">Reason: {blockedReason}</p>
        )}
      </div>
      <div className="flex flex-row justify-start mt-4">
        <h3>Description</h3>
      </div>
      <div
        className={`${
          darkMode ? "bg-sky-950" : ""
        } mt-2 flex flex-col items-start border rounded-xl py-3 pl-3 w-full`}
      >
        <NameValuePair name="Title" value={title} />

        <NameValuePair name="Description" value={description} />

        <NameValuePair name="Status" value={ticketStatus.columnState} />

        <NameValuePair name="Owned by: " value={userInfo.name} />

        <NameValuePair name="Created: " value={createdAt} />
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>{renderModalBody(actionType)}</Modal.Body>
        <Modal.Footer>
          <Button
            className="border bg-slate-500"
            variant="secondary"
            onClick={handleNoSubmitModalClose}
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
