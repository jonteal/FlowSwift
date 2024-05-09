import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_CLIENTS } from "../../../graphql/queries/clientQueries";
import { GET_ALL_CLIENT_INVOICES } from "../../../graphql/queries/invoiceQueries";

// COMPONENTS
import { NewClientsThisMonth } from "../../../components/mainDashboard/NewClientsThisMonth/NewClientsThisMonth";
import { TotalClients } from "../../../components/mainDashboard/TotalClients/TotalClients";
// import { Spinner } from "../../../components/reusable/Spinner/Spinner";

export const MainDashboard = () => {
  // This Month's Sales / Revenue
  // Annual Revenue Graph

  const {
    loading: clientLoading,
    error: clientError,
    data: clientsData,
  } = useQuery(GET_CLIENTS);

  const {
    loading: invoicesLoading,
    error: invoicesError,
    data: invoicesData,
  } = useQuery(GET_ALL_CLIENT_INVOICES);

  console.log("data: ", invoicesData);

  //   if (clientLoading) return <Spinner />;
  if (clientError) return <p>There was an error loading the content</p>;

  console.log("clientsData: ", clientsData);

  return (
    <div className="bg-slate-200 h-screen flex flex-row">
      {clientsData && <TotalClients clientsData={clientsData} />}
      <NewClientsThisMonth />
    </div>
  );
};
