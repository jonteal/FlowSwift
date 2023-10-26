import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTION } from "../../../../graphql/queries/transactionQueries";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { NameValuePair } from "../../../../components/reusable/NameValuePair/NameValuePair";

export const ProjectTransaction = () => {
  const { transactionId } = useParams();

  const {
    loading: transactionLoading,
    error: transactionError,
    data: transactionData,
  } = useQuery(GET_TRANSACTION, { variables: { id: transactionId } });

  if (transactionLoading) return <Spinner />;
  if (transactionError)
    return <p>There was a problem loading the project transactions...</p>;

  const {
    amount,
    client,
    createdAt,
    incomingOutgoing,
    paymentDate,
    paymentParty,
    project,
  } = transactionData.transaction;

  return (
    <div className="bg-slate-50 w-full rounded-xl mx-2 py-2 mt-2">
      <div className="flex flex-col items-start px-3">
        <h1 className="text-slate-600 text-xl ml-2 mb-2 text-left">
          Transaction
        </h1>

        <div className="flex flex-row justify-between w-1/2">
          <NameValuePair name="Payment Date" value={paymentDate} />
          <NameValuePair name="Source / Destination" value={paymentParty} />
        </div>
        <div className="flex flex-col ml-2">
          <p className="text-slate-600 font-light text-left text-sm">Amount</p>
          <div className="flex flex-row items-center">
            <div
              className={`${
                incomingOutgoing === "Outgoing"
                  ? "text-red-600"
                  : "text-lime-600"
              } text-base font-semibold flex flex-row items-center`}
            >
              <span className="mr-1">
                {incomingOutgoing === "Outgoing" ? "-" : "+"}
              </span>
              $<p>{amount}</p>
            </div>
          </div>
        </div>
        <NameValuePair
          name="Client"
          value={client.firstName + " " + client.lastName}
        />
        <NameValuePair name="Created" value={createdAt} />
        <NameValuePair name="Type" value={incomingOutgoing} />
        <NameValuePair name="Project" value={project.title} />
      </div>
    </div>
  );
};
