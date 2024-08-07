import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

// ICONS
import { FaRegTrashAlt } from "react-icons/fa";

// GRAPHQL
import { DELETE_CLIENT } from "../../../graphql/mutations/clientMutations";
import { GET_CLIENTS } from "../../../graphql/queries/clientQueries";

// COMPONENTS
import { Button } from "../../../@/components/ui/button";
import Modal from "react-bootstrap/Modal";

export type DeleteModalProps = {
  subject: string;
  clientId: string;
  organizationId: string;
};

export const DeleteModal = ({
  subject,
  clientId,
  organizationId,
}: DeleteModalProps) => {
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
      <div className="flex justify-center" onClick={handleShow}>
        <FaRegTrashAlt className="text-red-500 self-center" />
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
          <Button className="border bg-slate-500" onClick={handleClose}>
            Close
          </Button>
          {/* <div onClick={deleteClient}> */}
          <Button onClick={handleClose}>Delete</Button>
          {/* </div> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};
