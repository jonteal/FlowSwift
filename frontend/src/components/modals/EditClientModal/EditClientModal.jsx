import { useMutation } from "@apollo/client";

// ICONS
import { FiEdit2 } from "react-icons/fi";

// GRAPHQL
import { UPDATE_CLIENT } from "../../../graphql/mutations/clientMutations";
import { GET_CLIENT } from "../../../graphql/queries/clientQueries";

// COMPONENTS
import { Button } from "../../../@/components/ui/button";
import Modal from "react-bootstrap/Modal";
import { DynamicInput } from "../../reusable/DynamicInput/DynamicInput";

// STATE
import { useState } from "react";
import { useSelector } from "react-redux";

export const EditClientModal = ({ subject, client }) => {
  const { darkMode } = useSelector((state) => state.theme);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [firstName, setFirstName] = useState(client?.firstName);
  const [lastName, setLastName] = useState(client?.lastName);
  const [companyName, setCompanyName] = useState(client?.companyName);
  const [phoneNumber, setPhoneNumber] = useState(client?.phoneNumber);
  const [emailAddress, setEmailAddress] = useState(client?.emailAddress);
  const [organizationId, setOrganizationId] = useState(
    client?.organization?.id
  );
  const [status, setStatus] = useState(() => {
    switch (client?.status) {
      case "Lead":
        return "lead";
      case "Prospect":
        return "prospect";
      case "Current":
        return "current";
      case "Former":
        return "former";
      case "Cold":
        return "cold";
      default:
        return "Unknown status";
    }
  });

  const [updateClient] = useMutation(UPDATE_CLIENT, {
    variables: {
      id: client?.id,
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      companyName,
      status,
      organizationId,
    },
    refetchQueries: [
      {
        query: GET_CLIENT,
        variables: {
          id: client?.id,
        },
      },
    ],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName) {
      return alert("Please fill enter a name for your client...");
    }

    updateClient(
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      companyName,
      status,
      organizationId
    );

    handleClose();
  };

  return (
    <>
      <div onClick={handleShow}>
        <FiEdit2 className={darkMode ? "text-slate-50" : "text-sky-900"} />
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          className={darkMode ? "bg-sky-800" : "bg-slate-50"}
          closeButton
        >
          <Modal.Title
            className={darkMode ? "text-slate-50" : "text-slate-900"}
          >
            Edit {subject}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={darkMode ? "bg-sky-800" : "bg-slate-50"}>
          <DynamicInput
            id="edit-client-first-name"
            inputType="input"
            type="text"
            label="First Name"
            changeHandler={(e) => setFirstName(e.target.value)}
            value={firstName}
            className="mb-10 mr-10 w-full"
            ariaLabel="Client First Name edit input"
          />

          <DynamicInput
            id="edit-client-last-name"
            inputType="input"
            type="text"
            label="Last Name"
            changeHandler={(e) => setLastName(e.target.value)}
            value={lastName}
            className="mb-10 mr-10 w-full"
            ariaLabel="Client Last Name edit input"
          />
          <DynamicInput
            id="edit-client-company"
            inputType="input"
            type="text"
            label="Company Name"
            changeHandler={(e) => setCompanyName(e.target.value)}
            value={companyName}
            className="mb-10 mr-10 w-full"
            ariaLabel="Client Company Name edit input"
          />

          <DynamicInput
            id="edit-client-phone-number"
            inputType="input"
            type="text"
            label="Phone Number"
            changeHandler={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            className="mb-10 mr-10 w-full"
            ariaLabel="Client Phone Number edit input"
          />

          <DynamicInput
            id="edit-client-email-address"
            inputType="input"
            type="email"
            label="Email Address"
            changeHandler={(e) => setEmailAddress(e.target.value)}
            value={emailAddress}
            className="mb-10 mr-10 w-full"
            ariaLabel="Client Email Address edit input"
          />

          <DynamicInput
            id="edit-client-status"
            inputType="select"
            label="Client Status"
            changeHandler={(e) => setStatus(e.target.value)}
            value={status}
            selectOptions={[
              { value: "lead", label: "Lead" },
              { value: "prospect", label: "Prospect" },
              { value: "current", label: "Current" },
              { value: "former", label: "Former" },
              { value: "cold", label: "Cold" },
            ]}
            className="mb-10 mr-10 w-full"
          />
        </Modal.Body>
        <Modal.Footer className={darkMode ? "bg-sky-800" : "bg-slate-50"}>
          <Button className="border bg-slate-500" onClick={handleClose}>
            Close
          </Button>
          <Button clickHandler={onSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
