import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import { ClientTable } from "../ClientTable/ClientTable";

// STATE
import { useContext } from "react";
import { ThemeContext } from "../../context";

export const AccordionComponent = ({
  clientCount,
  containerState,
  linkLabel,
  link,
  clients,
  container,
}) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
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
            <Link
              className={`${
                darkMode ? "text-slate-50" : "text-slate-900"
              } mr-3`}
              to={link}
            >
              {linkLabel}
            </Link>
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
