import { ProjectsTableItem } from "../ProjectsTableItem/ProjectsTableItem";

export const ProjectsTable = ({ data, searchTerm }) => (
  <div className="border w-full mx-10 flex flex-col">
    {data.projects
      .filter((val) => {
        if (searchTerm === "") {
          return val;
        } else if (
          val?.client.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return val;
        } else if (
          val?.title.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return val;
        } else if (
          val?.client.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return val;
        }
      })
      .map((project) => (
        <ProjectsTableItem key={project.id} project={project} />
      ))}
  </div>
);
