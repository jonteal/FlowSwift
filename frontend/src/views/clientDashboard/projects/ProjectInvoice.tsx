import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_INVOICE } from "../../../graphql/queries/invoiceQueries";

// COMPONENTS
import { Spinner } from "../../../components/reusable/Spinner/Spinner";
import { NameValuePair } from "../../../components/reusable/NameValuePair/NameValuePair";

// STATE
// import { useSelector } from "react-redux";
import { DynamicContainer } from "../../../components/reusable/DynamicContainer/DynamicContainer";
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";

export const ProjectInvoice = () => {
  const { invoiceId } = useParams();
  const { darkMode } = useAppSelector((state: RootState) => state.theme);

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
    <DynamicContainer
      className={`${
        darkMode ? "bg-sky-800" : "bg-slate-50"
      } w-full rounded-xl md:mx-2 py-2 mt-2`}
    >
      <div className="flex flex-col items-start px-3">
        <h1
          className={`${
            darkMode ? "text-slate-50" : "text-slate-600"
          }  text-xl ml-2 mb-2 text-left`}
        >
          Invoice
        </h1>

        <NameValuePair name="Invoice Number" value={invoiceNumber} />
        <NameValuePair name="Amount" value={`$ ${amount}`} />
        <NameValuePair name="Invoice Date" value={date} />
        <NameValuePair name="Created" value={createdAt} />
      </div>
    </DynamicContainer>
  );
};