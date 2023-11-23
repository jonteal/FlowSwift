import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { ADD_CLIENT } from "../../graphql/mutations/clientMutations";
import { GET_CLIENTS } from "../../graphql/queries/clientQueries";
import { GET_USER } from "../../graphql/queries/userQueries";

// COMPONENTS
import { DynamicButton } from "../../components/reusable/DynamicButton/DynamicButton";
import { Spinner } from "react-bootstrap";
import { DynamicInput } from "../../components/reusable/DynamicInput/DynamicInput";
import { DynamicContainer } from "../../components/reusable/DynamicContainer/DynamicContainer";

// STATE
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const AddClient = () => {
  const { organizationId } = useParams();

  const { darkMode } = useSelector((state) => state.theme);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [status, setStatus] = useState("prospect");

  const { userInfo } = useSelector((state) => state.auth);

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      companyName,
      status,
      organizationId,
    },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS,
        variables: { organizationId },
      });

      cache.writeQuery({
        query: GET_CLIENTS,
        variables: { organizationId },
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USER, {
    variables: { id: userInfo._id },
  });

  if (userLoading) return <Spinner />;
  if (userError) return <p>There was an error..</p>;

  const onSubmit = (e) => {
    e.preventDefault();

    if (firstName === "" || lastName === "") {
      alert("Please fill in the client name");
    }

    addClient(
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      companyName,
      status,
      organizationId
    );

    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmailAddress("");
    setCompanyName("");
    setStatus("prospect");
  };

  return (
    <DynamicContainer>
      <div className="flex flex-col items-center">
        <h3
          className={`${
            darkMode ? "text-slate-50" : "text-slate-800"
          } font-semibold  text-lg my-3`}
        >
          Add Client
        </h3>

        <form className="w-full max-w-lg" onSubmit={onSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <DynamicInput
              id="client-first-name"
              inputType="input"
              type="text"
              label="First Name"
              changeHandler={(e) => setFirstName(e.target.value)}
              placeholder="Jane"
              value={firstName}
              className="w-full md:w-1/2 px-3"
              ariaLabel="First name input"
            />

            <DynamicInput
              id="client-last-name"
              inputType="input"
              type="text"
              label="Last Name"
              changeHandler={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              value={lastName}
              className="w-full md:w-1/2 px-3"
              ariaLabel="Last name input"
            />
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <DynamicInput
              id="client-phone-number"
              inputType="input"
              type="text"
              label="Phone Number"
              changeHandler={(e) => setPhoneNumber(e.target.value)}
              placeholder="479-523-1234"
              value={phoneNumber}
              className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
              ariaLabel="Phone Number input"
            />

            <DynamicInput
              id="client-email-address"
              inputType="input"
              type="email"
              label="Email Address"
              changeHandler={(e) => setEmailAddress(e.target.value)}
              placeholder="jane@gmail.com"
              value={emailAddress}
              className="w-full md:w-1/2 px-3"
              ariaLabel="Email Address input"
            />
          </div>

          <DynamicInput
            id="client-company-name"
            inputType="input"
            type="text"
            label="Company Name"
            changeHandler={(e) => setCompanyName(e.target.value)}
            placeholder="Jane's Cafe"
            value={companyName}
            className="w-full px-3"
            ariaLabel="Company Name input"
          />

          <DynamicInput
            id="client-status"
            inputType="select"
            label="Status"
            changeHandler={(e) => setStatus(e.target.value)}
            value={status}
            selectOptions={[
              { value: "lead", label: "Lead" },
              { value: "prospect", label: "Prospect" },
              { value: "current", label: "Current" },
              { value: "former", label: "Former" },
              { value: "cold", label: "Cold" },
            ]}
            className="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-5"
            ariaLabel="Client Status select"
          />
          <DynamicButton color="blue" type="submit">
            Save
          </DynamicButton>
        </form>
      </div>
    </DynamicContainer>
  );
};
