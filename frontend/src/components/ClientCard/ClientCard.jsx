import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { formatPhoneNumber } from "../../utils/format";

// GRAPHQL
import { DELETE_CLIENT } from "../../graphql/mutations/clientMutations";
import { GET_CLIENTS } from "../../graphql/queries/clientQueries";

// COMPONENTS
import { DeleteModal } from "../modals/DeleteModal/DeleteModal";
import { NameValuePair } from "../reusable/NameValuePair/NameValuePair";
import { DynamicButton } from "../reusable/DynamicButton/DynamicButton";

// STATE
import { useContext } from "react";
import { ThemeContext } from "../../context/context";

export const ClientCard = ({ clientData }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const navigate = useNavigate();
  const {
    id,
    companyName,
    firstName,
    lastName,
    phoneNumber,
    emailAddress,
    status,
  } = clientData.client;

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id },
    onCompleted: () => navigate(`/clients`),
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  return (
    <div
      className={`mt-1  ${
        darkMode ? "bg-sky-800" : "bg-slate-50"
      } w-full rounded-xl`}
    >
      <div className="flex flex-row items-center justify-end pt-3 pr-2">
        <DynamicButton
          type="link"
          color="lightBlue"
          className="mr-2"
          link={`/clients/${id}/edit`}
        >
          Edit
        </DynamicButton>
        <DeleteModal subject="Client" deleteClient={deleteClient} />
      </div>
      <div className="h-screen px-3">
        <NameValuePair type="header" name="Company" value={companyName} />

        <NameValuePair name="Contact" value={`${firstName} ${lastName}`} />

        <NameValuePair
          name="Primary Phone Number"
          value={formatPhoneNumber(phoneNumber)}
        />

        <NameValuePair name="Primary Email Address" value={emailAddress} />

        <NameValuePair name="Client Status" value={status} />
      </div>
    </div>
  );
};
