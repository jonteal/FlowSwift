// ICONS
import { PiArrowsOutLineHorizontalBold } from "react-icons/pi";
import { PiArrowsInLineHorizontalBold } from "react-icons/pi";

// COLUMNS
import { Ticket } from "../Ticket/Ticket";
// import { DeleteColumn } from "../../../views/clientDashboard/projects/NewKanban/DeleteColumn";

// STATE
import { useState } from "react";
import { useSelector } from "react-redux";

// UTILS
import { capitalized } from "../../../utils/format";

export const KanbanColumn = ({ column, ticketData }) => {
  const { darkMode } = useSelector((state) => state.theme);

  const [collapseColumn, setCollapseColumn] = useState(false);
  const [isColumnHorizontallyCollapsed, setIsColumnHorizontallyCollapsed] =
    useState(false);

  const handleColumnHorizontalCollapse = () => {
    setIsColumnHorizontallyCollapsed(!isColumnHorizontallyCollapsed);
  };

  return (
    <div
      className={`flex flex-row ${
        isColumnHorizontallyCollapsed ? "w-12" : "w-full"
      }`}
    >
      <div
        className={`flex flex-col items-center ${
          darkMode
            ? "bg-sky-900 border-slate-100"
            : "bg-slate-300 border-slate-500"
        } w-full mt-2 mr-2 rounded-lg md:min-h-screen `}
      >
        <div className="w-full border-red-50 flex flex-row items-center justify-between">
          {!isColumnHorizontallyCollapsed && (
            <div className="flex flex-row items-center justify-start w-full mt-2">
              <h5 className="font-extrabold ml-3">
                {capitalized(column.columnState)}
              </h5>
              <p className="ml-2">
                (
                {
                  ticketData.tickets.filter(
                    (ticket) => ticket.status === column.id
                  ).length
                }
                )
              </p>
            </div>
          )}
          {/* <DeleteColumn
              subject="Status Column"
              columnId={column.id}
              kanbanId={kanbanId}
            /> */}
          {isColumnHorizontallyCollapsed ? (
            <PiArrowsOutLineHorizontalBold
              onClick={handleColumnHorizontalCollapse}
              className={` ${
                darkMode ? "text-slate-50" : "text-slate-900"
              } text-xl cursor-pointer mr-3 ${
                isColumnHorizontallyCollapsed ? "mt-2 ml-2" : ""
              }`}
            />
          ) : (
            <PiArrowsInLineHorizontalBold
              onClick={handleColumnHorizontalCollapse}
              className={` ${
                darkMode ? "text-slate-50" : "text-slate-900"
              } text-2xl cursor-pointer mr-3 ${
                isColumnHorizontallyCollapsed ? "mt-2 ml-2" : ""
              }`}
            />
          )}
        </div>

        {!isColumnHorizontallyCollapsed && (
          <ul
            className={`${
              collapseColumn ? "hidden" : ""
            } list-none pl-0 w-full`}
          >
            {ticketData.tickets
              .filter((ticket) => ticket.status === column.id)
              .map((ticket) => (
                <li key={ticket.id} className="w-full">
                  <Ticket ticket={ticket} />
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};
