import { FaMoneyBillWave } from "react-icons/fa";

export const TotalBilledCard = ({ totalBilled }) => {
  return (
    <div className="bg-slate-50 rounded-xl mx-2 mt-2 mb-3 py-2 flex flex-row items-start justify-between w-auto">
      <div className="flex flex-col justify-center py-2 px-3">
        <h2 className="text-slate-700 text-lg font-semibold px-2">
          Total Billed
        </h2>
        <p className="text-lime-600 text-xl">$ {totalBilled}</p>
      </div>
      <div className="py-2 px-2 rounded-full bg-green-600 mr-2 mt-2">
        <FaMoneyBillWave className="text-lg text-slate-50" />
      </div>
    </div>
  );
};
