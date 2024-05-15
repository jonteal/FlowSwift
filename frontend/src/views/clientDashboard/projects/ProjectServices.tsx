import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_SERVICES } from "../../../graphql/queries/serviceQueries";

// COMPONENTS
import { ServicesTable } from "../../../components/dashboardTables/ServicesTable";
import { ServiceType } from "../../../types/types";

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
    <div className="flex flex-col h-screen">
      <ServicesTable
        type="In House"
        services={servicesData.services.filter(
          (service: ServiceType) => service.serviceProvider === "In House"
        )}
      />
      <ServicesTable
        type="Third Party Services"
        services={servicesData.services.filter(
          (service: ServiceType) => service.serviceProvider === "Third Party"
        )}
      />
    </div>
  );
};
