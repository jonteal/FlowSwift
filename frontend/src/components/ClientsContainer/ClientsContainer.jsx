import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ClientTable } from "../ClientTable/ClientTable";
import { useContext } from "react";
import { ThemeContext } from "../../context";

export const ClientsContainer = ({ clientData, clientContainer }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      key={clientContainer.id}
      className="mb-7 border-slate-400 p-2 rounded-md"
    >
      <div
        className={`flex flex-row items-center justify-between border ${
          darkMode ? "bg-sky-800 rounded-t-lg" : "rounded-lg"
        }`}
      >
        <div className="flex flex-row items-center">
          <h5 className="text-base py-2 pl-2">{clientContainer.state}</h5>
          {isExpanded ? (
            <FaChevronUp onClick={handleClick} className="ml-1" />
          ) : (
            <FaChevronDown onClick={handleClick} className="ml-1" />
          )}
        </div>
        <Link className="mr-3" to={`list/${clientContainer.state}`}>
          View All
        </Link>
      </div>

      {isExpanded && (
        <ClientTable
          key={clientContainer.id}
          clientContainer={clientContainer}
          clients={clientData.clients}
        />
      )}
    </div>
  );
};
