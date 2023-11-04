import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

// UTILS
import { formatPhoneNumber } from "../../utils/format";

// GRAPHQL
import { DELETE_CLIENT } from "../../graphql/mutations/clientMutations";
import { GET_CLIENTS } from "../../graphql/queries/clientQueries";

// COMPONENTS
import { DeleteModal } from "../modals/DeleteModal/DeleteModal";
import { NameValuePair } from "../../components/reusable/NameValuePair/NameValuePair";
import { DynamicButton } from "../reusable/DynamicButton/DynamicButton";
import { DynamicContainer } from "../reusable/DynamicContainer/DynamicContainer";

export const ClientCard = ({ clientData }) => {
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
    <DynamicContainer>
      <div className="flex flex-row items-center justify-end pt-2 pr-2">
        <DynamicButton
          type="link"
          color="lightBlue"
          className="mr-2"
          link={`/clients/${id}/edit`}
        >
          Edit
        </DynamicButton>
        <DeleteModal subject="Client" deleteItem={deleteClient} />
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
    </DynamicContainer>
  );
};
