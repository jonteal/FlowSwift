import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_CLIENTS } from "../../../graphql/queries/clientQueries";

// COMPONENTS
import { ClientsContainer } from "../../../components/ClientsContainer/ClientsContainer";
import { Spinner } from "../../../components/reusable/Spinner/Spinner";

import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { GET_USER } from "../../../graphql/queries/userQueries";
import { GET_ORGANIZATION } from "../../../graphql/queries/organizationQueries";

export const ClientList = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USER, {
    variables: { id: userInfo._id },
  });

  // const {
  //   loading: organizationLoading,
  //   error: organizationError,
  //   data: organizationData,
  // } = useQuery(GET_ORGANIZATION, {
  //   variables: { id: userData?.user.organizationId },
  // });

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENTS, {
    variables: { organizationId: userData?.user.organizationId },
  });

  if (clientLoading) return <Spinner />;
  if (clientError) return <p>Something went wrong...</p>;

  const clientContainers = [
    {
      id: "lead",
      state: "Lead",
    },
    {
      id: "prospect",
      state: "Prospect",
    },
    {
      id: "current",
      state: "Current",
    },
    {
      id: "former",
      state: "Former",
    },
    {
      id: "cold",
      state: "Cold",
    },
  ];

  return (
    <div className="overflow-x-scroll	">
      <div className="flex flex-row">
        <FaUserAlt className="mr-5" />
        <h5 className="mb-3">Total Records ({clientData?.clients.length})</h5>
      </div>
      <ul className="overflow-x-scroll">
        {clientContainers.map((clientContainer) => (
          <ClientsContainer
            key={clientContainer.id}
            clientContainer={clientContainer}
            clientData={clientData}
          />
        ))}
      </ul>
    </div>
  );
};
