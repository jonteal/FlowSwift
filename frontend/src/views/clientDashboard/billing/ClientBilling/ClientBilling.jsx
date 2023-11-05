import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_ALL_CLIENT_INVOICES } from "../../../../graphql/queries/invoiceQueries";
import { GET_ALL_CLIENT_TRANSACTIONS } from "../../../../graphql/queries/transactionQueries";

// COMPONENTS
import { InvoiceTable } from "../../../../components/InvoiceTable/InvoiceTable";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { TransactionTable } from "../../../../components/TransactionTable/TransactionTable";
import { BilledThisMonth } from "../../../../components/dashboardBilling/BilledThisMonth/BilledThisMonth";
import { FiltersList } from "../../../../components/reusable/FiltersList/FiltersList";

// STATE
import { useSelector } from "react-redux";

// UTILS
import { clientBillingFilters } from "./filters";

// import { TotalBilledCard }from "../../../../components/dashboardBilling/TotalBilledCard/TotalBilledCard";
// import { BudgetRemaining } from "../../../../components/dashboardBilling/BudgetRemaining/BudgetRemaining";

export const ClientBilling = () => {
  const { clientId } = useParams();
  const [isFilterOptionsOpen, setIsFilterOptionsOpen] = useState(false);

  const { billedThisMonth } = useSelector((state) => state.clientBilling);

  const {
    loading: invoicesLoading,
    error: invoicesError,
    data: invoicesData,
  } = useQuery(GET_ALL_CLIENT_INVOICES, { variables: { clientId } });

  const {
    loading: transactionsLoading,
    error: transactionsError,
    data: transactionsData,
  } = useQuery(GET_ALL_CLIENT_TRANSACTIONS, { variables: { clientId } });

  const handleOpenFilters = () => {
    setIsFilterOptionsOpen(!isFilterOptionsOpen);
  };

  if (invoicesLoading || transactionsLoading) return <Spinner />;
  if (invoicesError || transactionsError)
    return <p>There was a problem loading the client transactions...</p>;

  // const budgetRemaining = budgetsTotalSum - invoicesTotalSum;

  return (
    <div className="w-full flex flex-col">
      <button
        className="border bg-sky-300 px-4 py-2 rounded-lg"
        onClick={handleOpenFilters}
      >
        Filters
      </button>
      {isFilterOptionsOpen && <FiltersList filters={clientBillingFilters} />}

      <div className="w-full flex flex-row">
        {/* <TotalBilledCard totalBilled={invoicesTotalSum} /> */}
        {billedThisMonth && (
          <BilledThisMonth billedThisMonth={billedThisMonth} />
        )}
        {/* <BudgetRemaining budgetRemaining={budgetRemaining} /> */}
      </div>
      <div className="w-full flex flex-col md:flex-row items-center">
        <InvoiceTable invoices={invoicesData.clientInvoices} />
        <TransactionTable transactions={transactionsData.clientTransactions} />
      </div>
    </div>
  );
};
