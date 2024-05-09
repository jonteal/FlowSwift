import { TbPigMoney } from "react-icons/tb";

export const BudgetRemaining = ({
  budgetRemaining,
}: {
  budgetRemaining: number;
}) => {
  return (
    <div className="bg-slate-50 w-auto rounded-xl mx-2 mt-2 mb-3 py-2 flex flex-row items-start justify-between">
      <div className="flex flex-col justify-center py-2 pl-3">
        <h2 className="text-slate-700 text-lg font-semibold px-2">
          Budget Remaining
        </h2>
        <p className="text-lime-600 text-xl">$ {budgetRemaining}</p>
        {/* <p>
          <span className="text-lime-600">+3%</span> since last month
        </p> */}
      </div>
      <div className="py-2 px-2 rounded-full bg-orange-400 mr-2 mt-2">
        <TbPigMoney className="text-lg text-slate-50" />
      </div>
    </div>
  );
};
