import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";

// COMPONENTS
import { ProjectsTable } from "../ProjectsTable/ProjectsTable";

// STATE
import { useSelector } from "react-redux";

export const ProjectsAccordion = ({
  linkLabel,
  link,
  projects,
  searchTerm,
}) => {
  const { darkMode } = useSelector((state) => state.theme);

  const [isExpanded, setIsExpanded] = useState(false);

  const projectCount = projects.length;

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <Accordion defaultActiveKey="0" alwaysOpen={false} className="w-full">
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
              ({projectCount})
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
          <ProjectsTable searchTerm={searchTerm} projects={projects} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
