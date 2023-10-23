import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_SERVICES } from "../../../../graphql/queries/serviceQueries";
import { ServicesTable } from "../../../../components/dashboardTables/ServicesTable/ServicesTable";

export const ProjectServices = () => {
  const { projectId } = useParams();

  const {
    loading: servicesLoading,
    error: servicesError,
    data: servicesData,
  } = useQuery(GET_SERVICES, { variables: { projectId } });

  if (servicesLoading) return <p>Loading...</p>;
  if (servicesError) return <p>There was an error loading services...</p>;

  return (
    <div className="flex flex-col">
      <ServicesTable
        type="In House"
        services={servicesData.services.filter(
          (service) => service.serviceProvider === "In House"
        )}
      />
      <ServicesTable
        services={servicesData.services.filter(
          (service) => service.serviceProvider === "Third Party"
        )}
      />
    </div>
  );
};
