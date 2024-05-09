import { ReactNode, useState } from "react";
import { useMutation } from "@apollo/client";

// ICONS
import { FaRegTrashAlt } from "react-icons/fa";

// GRAPHQL
import { DELETE_PROJECT } from "../../graphql/mutations/projectMutations";
import { GET_ORGANIZATION_PROJECTS } from "../../graphql/queries/projectQueries";

// COMPONENTS
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DynamicButton } from "../../components/reusable/DynamicButton/DynamicButton";
import { useParams } from "react-router-dom";

export type DeleteProjectProps = {
  subject: string;
  projectId: string;
  children: ReactNode;
};

export const DeleteProject = ({
  subject,
  projectId,
  children,
}: DeleteProjectProps) => {
  const { organizationId } = useParams();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    refetchQueries: [
      { query: GET_ORGANIZATION_PROJECTS, variables: { organizationId } },
    ],
  });

  return (
    <div className="w-full">
      <div onClick={handleShow}>{children}</div>

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
          {/* <div onClick={deleteProject}> */}
          <DynamicButton color="red" type="delete">
            Delete
          </DynamicButton>
          {/* </div> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};
