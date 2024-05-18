import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_PROJECT_INVOICES } from "../../../graphql/queries/invoiceQueries";
import { GET_PROJECT } from "../../../graphql/queries/projectQueries";
import { GET_PROJECT_TRANSACTIONS } from "../../../graphql/queries/transactionQueries";

// COMPONENTS
import { Spinner } from "../../../components/reusable/Spinner/Spinner";
import { TransactionTable } from "../../../components/TransactionTable/TransactionTable";
import { InvoiceTable } from "../../../components/InvoiceTable/InvoiceTable";
import { ProgressBarComponent } from "../../../components/ProgressBar/ProgressBar";
import { DynamicContainer } from "../../../components/reusable/DynamicContainer/DynamicContainer";

export const ProjectFinancials = () => {
  const { projectId } = useParams();

  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
  } = useQuery(GET_PROJECT, { variables: { id: projectId } });

  const {
    loading: invoicesLoading,
    error: invoicesError,
    data: invoicesData,
  } = useQuery(GET_PROJECT_INVOICES, { variables: { projectId } });

  const {
    loading: transactionsLoading,
    error: transactionsError,
    data: transactionsData,
  } = useQuery(GET_PROJECT_TRANSACTIONS, { variables: { projectId } });

  if (invoicesLoading || transactionsLoading || projectLoading)
    return <Spinner />;
  if (invoicesError || transactionsError || projectError)
    return <p>There was a problem loading the client invoices...</p>;

  const invoiceSum = invoicesData.projectInvoices.reduce(function (
    acc: number,
    obj: { amount: string }
  ) {
    return acc + parseFloat(obj.amount);
  },
  0);

  const budgetUsed = (invoiceSum / projectData.project.clientBudget) * 100;

  return (
    <div className="mt-2 h-screen">
      <div className="flex flex-col w-full">
        <div className="w-full mx-2 my-3">
          <h2 className="text-left my-2">Budget Used</h2>
          <ProgressBarComponent now={budgetUsed} />
        </div>
        <div className="flex flex-col md:flex-row w-full items-start">
          <DynamicContainer className="flex flex-col w-full items-start mx-2">
            <Link className="mx-2 mb-3" to="invoices">
              View All Invoices
            </Link>

            <InvoiceTable
              shortList={true}
              invoices={invoicesData.projectInvoices}
            />
          </DynamicContainer>
          <DynamicContainer className="flex flex-col w-full items-start mr-2">
            <Link to="transactions" className="mx-2 mb-3">
              View All Transactions
            </Link>
            <TransactionTable
              shortList={true}
              transactions={transactionsData.projectTransactions}
            />
          </DynamicContainer>
        </div>
      </div>
    </div>
  );
};
