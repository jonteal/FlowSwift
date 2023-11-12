// COMPONENTS
import { DeleteModal } from "../modals/DeleteModal/DeleteModal";
import { NameValuePair } from "../../components/reusable/NameValuePair/NameValuePair";
import { DynamicButton } from "../reusable/DynamicButton/DynamicButton";
import { DynamicContainer } from "../reusable/DynamicContainer/DynamicContainer";

// UTILS
import { formatPhoneNumber } from "../../utils/format";

export const ClientCard = ({ clientData }) => {
  const {
    id,
    companyName,
    firstName,
    lastName,
    phoneNumber,
    emailAddress,
    status,
    organization,
  } = clientData.client;

  return (
    <DynamicContainer className="h-auto">
      <div className="flex flex-row items-center justify-end pr-2">
        <DynamicButton
          type="link"
          color="lightBlue"
          className="mr-2"
          link={`/clients/${id}/edit`}
        >
          Edit
        </DynamicButton>
        <DeleteModal
          organizationId={organization.id}
          clientId={id}
          subject="Client"
        />
      </div>
      <div className="h-auto md:h-screen px-3">
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
