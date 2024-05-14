import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

// GRAPHQL
import { GET_SERVICE } from "../../../graphql/queries/serviceQueries";

// COMPONENTS
import { Spinner } from "../../../components/reusable/Spinner/Spinner";
import { DynamicButton } from "../../../components/reusable/DynamicButton/DynamicButton";
import { NameValuePair } from "../../../components/reusable/NameValuePair/NameValuePair";

export const ProjectService = () => {
  const { clientId, projectId, serviceId, organizationId } = useParams();

  const { loading, error, data } = useQuery(GET_SERVICE, {
    variables: { id: serviceId },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  const {
    service,
    cost,
    paymentSchedule,
    status,
    serviceProvider,
    startDate,
    endDate,
    notes,
    project,
    createdAt,
  } = data.service;

  return (
    <div className="rounded-xl bg-slate-50 mx-2 mt-3 p-2 w-full">
      <DynamicButton
        type="link"
        link={`/organizations/${organizationId}/clients/${clientId}/projects/${projectId}/services/${serviceId}/edit`}
      >
        Edit
      </DynamicButton>
      <NameValuePair type="header" name="Service" value={service} />
      <NameValuePair name="Project" value={project.title} />
      <NameValuePair name="Cost" value={`$ ${cost}`} />
      <NameValuePair name="Payment Schedule" value={paymentSchedule} />
      <NameValuePair name="Provider" value={serviceProvider} />
      <NameValuePair name="Status" value={status} />
      <NameValuePair name="Start Date" value={startDate} />
      <NameValuePair name="End Date" value={endDate} />
      <NameValuePair name="Notes" value={notes} />
      <NameValuePair name="Created" value={createdAt} />
    </div>
  );
};
