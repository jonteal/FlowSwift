import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

// GRAPHQL
import { GET_CLIENT } from "../../../graphql/queries/clientQueries";
import { UPDATE_CLIENT } from "../../../graphql/mutations/clientMutations";

// COMPONENTS
import { Spinner } from "../../../components/reusable/Spinner/Spinner";
import { DynamicButton } from "../../../components/reusable/DynamicButton/DynamicButton";
import { DynamicInput } from "../../../components/reusable/DynamicInput/DynamicInput";
import { DynamicContainer } from "../../../components/reusable/DynamicContainer/DynamicContainer";

export const EditClient = () => {
  const { clientId } = useParams();

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENT, {
    variables: { id: clientId },
  });

  const client = clientData?.client;

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
      return alert("Please fill out all fields");
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
  };

  if (clientLoading) return <Spinner />;
  if (clientError) return <p>There was an error...</p>;

  return (
    <DynamicContainer className="w-full">
      {!clientLoading && !clientError && (
        <div className="mt-2">
          <form onSubmit={onSubmit}>
            <div className="flex flex-row w-full justify-around items-center">
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
            </div>

            <div className="flex flex-row w-full justify-around items-center">
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
            </div>

            <div className="flex flex-row w-full justify-around items-center">
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
            </div>

            <div onClick={onSubmit}>
              <DynamicButton color="blue" type="submit">
                Submit
              </DynamicButton>
            </div>
          </form>
        </div>
      )}
    </DynamicContainer>
  );
};
