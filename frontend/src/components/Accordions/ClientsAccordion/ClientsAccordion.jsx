import { Link } from "react-router-dom";

// COMPONENTS
import { ClientTable } from "../../ClientTable/ClientTable";
import Accordion from "react-bootstrap/Accordion";

// STATE
import { useState } from "react";
import { useSelector } from "react-redux";

export const ClientsAccordion = ({
  clientCount,
  containerState,
  linkLabel,
  link,
  clients,
  container,
}) => {
  const { darkMode } = useSelector((state) => state.theme);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Accordion defaultActiveKey="0" alwaysOpen={false}>
      <Accordion.Item
        className={`${darkMode ? "bg-sky-950" : ""}`}
        eventKey="0"
      >
        <Accordion.Header
          className={
            darkMode
              ? "bg-sky-800 text-slate-50"
              : "bg-slate-100 text-slate-900"
          }
          onClick={handleClick}
        >
          <div className="flex flex-row items-center justify-between w-full">
            <p className={`${darkMode ? "text-slate-50" : "text-slate-900"} `}>
              ({clientCount}) {containerState}
            </p>
            {link && linkLabel && (
              <Link
                className={`${
                  darkMode ? "text-slate-50" : "text-slate-900"
                } mr-3`}
                to={link}
              >
                {linkLabel}
              </Link>
            )}
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <ClientTable
            key={container.id}
            clientContainer={container}
            clients={clients}
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
