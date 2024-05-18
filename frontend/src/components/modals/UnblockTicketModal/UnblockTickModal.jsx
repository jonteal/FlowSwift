import { useState } from "react";

// COMPONENTS
import { Button } from "../../../@/components/ui/button";
import Modal from "react-bootstrap/Modal";

export const UnblockTicketModal = ({ ticket, unblockTicket, modalOpen }) => {
  const [show, setShow] = useState(modalOpen);
  const handleClose = () => setShow(false);

  const [title, setTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.title);
  const [status, setStatus] = useState(ticket.status);
  const [blocked, setBlocked] = useState(ticket.blocked);
  const [blockedReason, setBlockedReason] = useState(ticket.blockedReason);
  const [ready, setReady] = useState(ticket.ready);
  const [userId, setUserId] = useState(ticket.userId);
  const [ticketId, setTicketId] = useState(ticket.id);

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
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      {/* <Modal.Header closeButton>
        <Modal.Title>Delete=== {subject}</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>{`Unblock ticket?`}</Modal.Body>
      <Modal.Footer>
        <Button className="border bg-slate-500" onClick={handleClose}>
          Close
        </Button>
        <form onSubmit={onSubmit}>
          <div onClick={unblockTicket}>
            <Button onClick={handleClose} type="submit">
              Yes
            </Button>
          </div>
        </form>
      </Modal.Footer>
    </Modal>
  );
};
