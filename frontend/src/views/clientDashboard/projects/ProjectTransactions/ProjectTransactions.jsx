import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_ALL_CLIENT_TRANSACTIONS } from "../../../../graphql/queries/transactionQueries";

// COMPONENTS
import { TransactionTable } from "../../../../components/TransactionTable/TransactionTable";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";

export const ProjectTransactions = () => {
  const { projectId } = useParams();

  const {
    loading: transactionsLoading,
    error: transactionsError,
    data: transactionsData,
  } = useQuery(GET_ALL_CLIENT_TRANSACTIONS, { variables: { projectId } });

  if (transactionsLoading) return <Spinner />;
  if (transactionsError)
    return <p>There was a problem loading the client invoices...</p>;

  return (
    <div className="mt-2">
      <TransactionTable
        shortList={false}
        transactions={transactionsData.transactions}
      />
    </div>
  );
};
