import { Link, useParams } from "react-router-dom";

// ICONS
import { GrTransaction } from "react-icons/gr";

// COMPONENTS
import { DynamicButton } from "../reusable/DynamicButton/DynamicButton";
import { ClientTransactionItem } from "../dashboardBilling/ClientTransactionItem/ClientTransactionItem";

// STATE
import { useSelector } from "react-redux";

export const TransactionTable = ({ transactions, shortList }) => {
  const { darkMode } = useSelector((state) => state.theme);

  const { clientId, projectId } = useParams();

  const filteredList = shortList ? transactions : transactions.slice(0, 5);

  return (
    <div
      className={`${
        darkMode ? "bg-sky-800" : "bg-slate-50"
      } w-full rounded-xl mx-0 md:mx-2 py-2 md:mt-0`}
    >
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-row items-center mx-1">
          <GrTransaction
            className={`ml-2 text-lg ${
              darkMode ? "text-slate-50" : "text-sky-900"
            }`}
          />
          <h2
            className={`text-left ${
              darkMode ? "text-slate-50" : "text-slate-700"
            } text-lg mx-2`}
          >
            Transactions
          </h2>
        </div>
        <div className="flex flex-row justify-between py-2 px-2">
          <DynamicButton
            color="red"
            type="link"
            link={`/clients/${clientId}/addTransaction`}
          >
            Add Transaction
          </DynamicButton>
        </div>
      </div>

      {filteredList.length === 0 ? (
        <div className="flex flex-row items-center justify-center px-5">
          <h2 className="mt-5 text-lg italic pb-4">
            {`You do not have any transaction for this ${
              projectId ? "project" : "client"
            } yet. To add an transaction, select a project and add transaction in Financials section`}
          </h2>
        </div>
      ) : (
        filteredList.map((transaction) => (
          <Link
            key={transaction.id}
            to={`/clients/${clientId}/projects/${projectId}/financials/transactions/${transaction.id}`}
          >
            <ClientTransactionItem
              key={transaction.id}
              transaction={transaction}
            />
          </Link>
        ))
      )}
    </div>
  );
};
