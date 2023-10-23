import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_INVOICE } from "../../../../graphql/queries/invoiceQueries";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { NameValuePair } from "../../../../components/reusable/NameValuePair/NameValuePair";

export const ProjectInvoice = () => {
  const { invoiceId } = useParams();

  const {
    loading: invoiceLoading,
    error: invoiceError,
    data: invoiceData,
  } = useQuery(GET_INVOICE, { variables: { id: invoiceId } });

  if (invoiceLoading) return <Spinner />;
  if (invoiceError)
    return <p>There was a problem loading the client invoices...</p>;

  const { amount, createdAt, date, invoiceNumber } = invoiceData.invoice;

  return (
    <div className="bg-slate-50 w-full rounded-xl mx-2 py-2 mt-2">
      <div className="flex flex-col items-start px-3">
        <h1 className="text-slate-600 text-xl ml-2 mb-2">Invoice</h1>

        <NameValuePair name="Invoice Number" value={invoiceNumber} />
        <NameValuePair name="Amount" value={`$ ${amount}`} />
        <NameValuePair name="Invoice Date" value={date} />
        <NameValuePair name="Created" value={createdAt} />
      </div>
    </div>
  );
};
