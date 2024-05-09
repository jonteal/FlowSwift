import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_PROJECT_INVOICES } from "../../../../graphql/queries/invoiceQueries";

// COMPONENTS
import { InvoiceTable } from "../../../../components/InvoiceTable/InvoiceTable";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";

export const ProjectInvoices = () => {
  const { projectId } = useParams();

  const {
    loading: invoicesLoading,
    error: invoicesError,
    data: invoicesData,
  } = useQuery(GET_PROJECT_INVOICES, { variables: { projectId } });

  if (invoicesLoading) return <Spinner />;
  if (invoicesError)
    return <p>There was a problem loading the client invoices...</p>;

  return (
    <div className="mt-2">
      <InvoiceTable shortList={false} invoices={invoicesData.projectInvoices} />
    </div>
  );
};
