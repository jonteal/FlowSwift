import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

// GRAPHQL
import { DELETE_CLIENT } from "../../../graphql/mutations/clientMutations";
import { GET_CLIENTS } from "../../../graphql/queries/clientQueries";

// COMPONENTS
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DynamicButton } from "../../reusable/DynamicButton/DynamicButton";

export const DeleteModal = ({ subject, clientId, organizationId }) => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: clientId },
    onCompleted: () => navigate(`/clients`),
    refetchQueries: [{ query: GET_CLIENTS, variables: { organizationId } }],
  });

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
            <DynamicButton clickHandler={handleClose} color="red" type="delete">
              Delete
            </DynamicButton>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
