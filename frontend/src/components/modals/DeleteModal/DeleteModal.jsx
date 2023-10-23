import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DynamicButton } from "../../reusable/DynamicButton/DynamicButton";

export const DeleteModal = ({ deleteClient, subject }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div onClick={handleShow}>
        <DynamicButton color="red" type="delete">
          Delete
        </DynamicButton>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete {subject}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`Are you sure you want to delete this ${subject}? You cannot undo this
          action!`}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="border bg-slate-500"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
          <div onClick={deleteClient}>
            <DynamicButton color="red" type="delete">
              Delete
            </DynamicButton>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
