import { Ticket } from "../Ticket/Ticket";

import { useContext } from "react";
import { ThemeContext } from "../../../context";

export const StatusColumn = ({ statusColumns, ticketData }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div className="flex flex-row items-start ml-2">
      {statusColumns?.map((column) => (
        <div
          key={column.id}
          className={`flex flex-col items-center ${
            darkMode
              ? "bg-sky-800 border-slate-100"
              : "bg-slate-300 border-slate-500"
          }  w-1/2 mt-2 mr-2 rounded-lg h-auto min-h-screen `}
        >
          <div className="flex flex-row items-center mt-2">
            <h5 className="font-extrabold">{column.state}</h5>
            <p className="ml-3">
              (
              {
                ticketData.tickets.filter(
                  (ticket) => ticket.status === column.state
                ).length
              }
              )
            </p>
          </div>
          <ul className="list-none pl-0 w-full">
            {ticketData.tickets
              .filter((ticket) => ticket.status === column.state)
              .map((ticket) => (
                <li key={ticket.id} className="w-full">
                  <Ticket ticket={ticket} />
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
