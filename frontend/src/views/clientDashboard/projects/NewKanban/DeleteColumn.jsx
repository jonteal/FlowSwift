import { useState } from "react";
import { useMutation } from "@apollo/client";

// ICONS
import { FaRegTrashAlt } from "react-icons/fa";

// GRAPHQL
import { DELETE_KANBAN_STATUS_COLUMN } from "../../../../graphql/mutations/kanbanStatusColumnMutations";
import { GET_KANBAN_STATUS_COLUMNS } from "../../../../graphql/queries/kanbanStatusColumnQueries";

// COMPONENTS
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";

export const DeleteColumn = ({ deleteFn, subject, kanbanId, columnId }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [deleteKanbanStatusColumn] = useMutation(DELETE_KANBAN_STATUS_COLUMN, {
    variables: { id: columnId },
    refetchQueries: [
      { query: GET_KANBAN_STATUS_COLUMNS, variables: { kanbanId } },
    ],
  });

  return (
    <div className="w-full">
      <FaRegTrashAlt
        className="text-red-500 cursor-pointer w-full"
        onClick={handleShow}
      />

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
          <div onClick={deleteKanbanStatusColumn}>
            <DynamicButton color="red" type="delete">
              Delete
            </DynamicButton>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
