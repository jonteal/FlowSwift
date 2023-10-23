// LIBRARIES
import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_CLIENT } from "../../../graphql/queries/clientQueries";

// COMPONENTS
import { ClientViewNav } from "../../../components/dashboardMain/ClientViewNav/ClientViewNav";
import { Spinner } from "../../../components/reusable/Spinner/Spinner";

import { useContext } from "react";
import { ThemeContext } from "../../../context";

export const ClientView = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const { clientId } = useParams();

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENT, {
    variables: { id: clientId },
  });

  if (clientLoading) return <Spinner />;
  if (clientError)
    return <p>There was a problem loading the client information...</p>;

  return (
    <div>
      {!clientLoading && !clientError && (
        <div
          className={`flex flex-col transform xl:translate-x-0 ease-in-out transition duration-500  ${
            darkMode ? "bg-sky-950" : "bg-slate-200"
          }`}
        >
          <div className="h-auto min-h-full mt-4 rounded-md flex flex-row">
            <ClientViewNav clientData={clientData} />
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};
