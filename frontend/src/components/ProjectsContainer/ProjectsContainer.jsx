import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { ProjectsTable } from "../dashboardTables/ProjectsTable/ProjectsTable";

export const ProjectsContainer = ({ clientProjects, projectContainer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div key={projectContainer.id}>
      <div>
        <h5>{projectContainer.state}</h5>
        {isExpanded ? (
          <FaChevronUp onClick={handleClick} />
        ) : (
          <FaChevronDown onClick={handleClick} />
        )}
      </div>

      {isExpanded && (
        <ProjectsTable
          key={projectContainer.id}
          projectContainer={projectContainer}
          projects={clientProjects}
        />
      )}
    </div>
  );
};
