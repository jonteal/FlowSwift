import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { FaRegEye, FaRegTrashAlt } from "react-icons/fa";

// GRAPHQL
import { GET_CLIENT } from "../../../graphql/queries/clientQueries";

// COMPONENTS
import { DynamicButton } from "../../reusable/DynamicButton/DynamicButton";
import Table from "react-bootstrap/Table";
import { ProjectType } from "../../../types/types";

export type ProjectsTableProps = {
  projects: ProjectType[];
  projectContainer: {
    state: string;
  };
};

export const ProjectsTable = ({
  projects,
  projectContainer,
}: ProjectsTableProps) => {
  const { clientId } = useParams();
  const { data: clientData } = useQuery(GET_CLIENT, {
    variables: { id: clientId },
  });

  return (
    <div className="rounded-xl bg-slate-50 mx-2 mt-3 px-3 w-full">
      <div className="flex flex-row justify-between items-center py-3">
        <h2 className="text-left text-slate-700 text-lg mx-3">
          Projects Table
        </h2>
        <DynamicButton
          type="link"
          color="red"
          link={`/clients/${clientId}/addProject`}
        >
          Add Project
        </DynamicButton>
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th className="text-slate-400 font-light w-10 text-left pl-2">#</th>
            <th className="text-slate-400 font-light w-2/12 text-left pl-2">
              Title
            </th>
            <th className="text-slate-400 font-light w-2/12 text-left pl-2">
              Status
            </th>
            <th className="text-slate-400 font-light w-2/12 text-left pl-2">
              Start Date
            </th>
            <th className="text-slate-400 font-light w-2/12 text-left pl-2">
              Deadline
            </th>
            <th className="text-slate-400 font-light w-1/12 text-left pl-2">
              Client Budget
            </th>
            <th className="text-slate-400 font-light w-1/12 text-left pl-2">
              Project Estimate
            </th>
          </tr>
        </thead>
        <tbody>
          {projects
            ?.filter((project) => project.status === projectContainer.state)
            .map((project, index) => (
              <tr key={project.id}>
                <td className="text-slate-700 font-light text-left border pl-2 pr-2">
                  {index + 1}
                </td>
                <td className="text-slate-700 font-light text-left border pl-2">
                  {project.title}
                </td>
                <td className="text-slate-700 font-light text-left border pl-2">
                  {project.status}
                </td>
                <td className="text-slate-700 font-light text-left border pl-2">
                  {project.startDate}
                </td>
                <td className="text-slate-700 font-light text-left border pl-2">
                  {project.deadline}
                </td>
                <td className="text-slate-700 font-light text-left border pl-2">
                  $ {project.clientBudget}
                </td>
                <td className="text-slate-700 font-light text-left border pl-2">
                  $ {project.projectEstimate}
                </td>
                <td className="text-slate-700 font-light text-left border pl-2">
                  <Link
                    to={`/clients/${clientData.client.id}/projects/${project.id}/profile`}
                  >
                    <FaRegEye className="text-sky-600" />
                  </Link>
                </td>
                <td className="text-slate-700 font-light text-left border pl-2">
                  <Link to="/">
                    <FaRegTrashAlt className="text-red-500" />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};
