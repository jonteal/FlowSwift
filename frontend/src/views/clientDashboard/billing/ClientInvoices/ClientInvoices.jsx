// GRAPHQL
import { GET_ALL_CLIENT_INVOICES } from "../../../../graphql/queries/invoiceQueries";

// COMPONENTS
import { InvoiceTable } from "../../../../components/InvoiceTable/InvoiceTable";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";

export const ClientInvoices = () => {
  const { clientId } = useParams();

  const {
    loading: invoicesLoading,
    error: invoicesError,
    data: invoicesData,
  } = useQuery(GET_ALL_CLIENT_INVOICES, { clientId });

  if (invoicesLoading) return <Spinner />;
  if (invoicesError)
    return <p>There was a problem loading the client transactions...</p>;

  return <InvoiceTable invoices={invoicesData.invoices} />;
};
