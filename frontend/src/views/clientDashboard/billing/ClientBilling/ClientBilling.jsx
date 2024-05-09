import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useState } from "react";

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
import { useDispatch, useSelector } from "react-redux";
import {
  setBilledThisMonthOn,
  setBilledThisMonthOff,
} from "../../../../slices/clientBilling";

// import { TotalBilledCard }from "../../../../components/dashboardBilling/TotalBilledCard/TotalBilledCard";
// import { BudgetRemaining } from "../../../../components/dashboardBilling/BudgetRemaining/BudgetRemaining";

export const ClientBilling = () => {
  const { clientId } = useParams();
  const [isFilterOptionsOpen, setIsFilterOptionsOpen] = useState(false);

  const dispatch = useDispatch();

  const { billedThisMonth } = useSelector((state) => state.clientBilling);

  const handleBilledThisMonthToggle = () => {
    billedThisMonth
      ? dispatch(setBilledThisMonthOff())
      : dispatch(setBilledThisMonthOn());
  };

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

  const clientBillingFilters = [
    {
      name: "Billed This Month",
      toggle: handleBilledThisMonthToggle,
      value: billedThisMonth,
      isChecked: billedThisMonth,
      ariaLabel: "Billed This Month filter",
    },
  ];

  console.log(
    "transactionsData.clientTransactions: ",
    transactionsData.clientTransactions
  );

  // const budgetRemaining = budgetsTotalSum - invoicesTotalSum;
  // const billedThisMonth = 50;

  return (
    <div className="w-full flex flex-col">
      <button
        className="border bg-sky-600 text-slate-50 px-4 py-2 rounded-lg mb-3 w-1/6 ml-3"
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
      <div className="w-full flex flex-col md:flex-row items-start">
        <div className="md:mx-2 w-full mb-2">
          <InvoiceTable invoices={invoicesData.clientInvoices} />
        </div>
        <div className="md:mx-2 w-full mb-2">
          <TransactionTable
            transactions={transactionsData.clientTransactions}
          />
        </div>
      </div>
    </div>
  );
};
