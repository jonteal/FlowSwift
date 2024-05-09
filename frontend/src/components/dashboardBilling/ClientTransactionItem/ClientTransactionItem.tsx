import { BsArrowUpSquare, BsArrowDownSquare } from "react-icons/bs";

// STATE
// import { useSelector } from "react-redux";
import { useAppSelector } from "../../../store/hooks";
import { TransactionType } from "../../TransactionTable/TransactionTable";
import { RootState } from "../../../store/store";

export type ClientTransactionItemProps = {
  transaction: TransactionType;
};

export const ClientTransactionItem = ({
  transaction,
}: ClientTransactionItemProps) => {
  const { darkMode } = useAppSelector((state: RootState) => state.theme);

  return (
    <div className="flex flex-row justify-between items-center w-full px-4 my-2">
      <div className="flex flex-row items-center">
        {transaction.incomingOutgoing === "Outgoing" ? (
          <BsArrowDownSquare className="text-red-600" />
        ) : (
          <BsArrowUpSquare className="text-lime-600" />
        )}
        <div className="flex flex-col items-start mx-4">
          <p
            className={`text-left ${
              darkMode ? "text-slate-50" : "text-slate-800"
            }  text-base`}
          >
            {transaction.paymentParty}
          </p>
          <p
            className={`text-left ${
              darkMode ? "text-slate-100" : "text-slate-500"
            }  text-sm`}
          >
            {transaction.paymentDate}
          </p>
        </div>
      </div>
      <div
        className={`${
          transaction.incomingOutgoing === "Outgoing"
            ? "text-red-600"
            : "text-lime-600"
        } text-base font-semibold flex flex-row items-center`}
      >
        <span className="mr-1">
          {transaction.incomingOutgoing === "Outgoing" ? "-" : "+"}
        </span>
        $<p>{transaction.amount}</p>
      </div>
    </div>
  );
};
