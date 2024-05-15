// LIBRARIES
import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_CLIENT } from "../../../graphql/queries/clientQueries";

// COMPONENTS
import { ClientViewNav } from "../../../components/dashboardMain/ClientViewNav";
import { ClientMobileMenu } from "../../../components/dashboardMain/ClientMobileMenu";
import { Spinner } from "../../../components/reusable/Spinner/Spinner";

// STATE
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";

export const ClientView = () => {
  const { darkMode } = useAppSelector((state: RootState) => state.theme);

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
          <div className="h-auto min-h-full mt-4 rounded-md flex flex-col md:flex-row">
            <div className="hidden md:block">
              <ClientViewNav clientData={clientData} />
            </div>
            <div className="block md:hidden">
              <ClientMobileMenu />
            </div>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};