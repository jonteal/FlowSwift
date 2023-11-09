import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import { ClientTable } from "../ClientTable/ClientTable";

export const AccordionComponent = ({
  clientCount,
  containerState,
  linkLabel,
  link,
  clients,
  container,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Accordion defaultActiveKey="0" alwaysOpen={false}>
      <Accordion.Item eventKey="0">
        <Accordion.Header onClick={handleClick}>
          <div className="flex flex-row items-center justify-between w-full">
            <p>
              ({clientCount}) {containerState}
            </p>
            <Link className="mr-3" to={link}>
              {linkLabel}
            </Link>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          {/* {isExpanded && ( */}
          <ClientTable
            key={container.id}
            clientContainer={container}
            clients={clients}
          />
          {/* )} */}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
