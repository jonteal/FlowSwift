import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { FaRegEye, FaRegTrashAlt } from "react-icons/fa";

// GRAPHQL
import { GET_CLIENT } from "../../graphql/queries/clientQueries";

// COMPONENTS
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../@/components/ui/table";

// TYPES
import { ProjectContainer, ProjectType } from "../../types/types";

export type ProjectsTableProps = {
  projects: ProjectType[];
  projectContainer: ProjectContainer;
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
        <Link to={`/clients/${clientId}/addProject`}>Add Project</Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Client Budget</TableHead>
            <TableHead>Project Estimate</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {projects
            ?.filter((project) => project.status === projectContainer.state)
            .map((project, index) => (
              <TableRow key={project.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>{project.startDate}</TableCell>
                <TableCell>{project.deadline}</TableCell>
                <TableCell>{project.clientBudget}</TableCell>
                <TableCell>$ {project.projectEstimate}</TableCell>
                <TableCell>
                  <Link
                    to={`/clients/${clientData.client.id}/projects/${project.id}/profile`}
                  >
                    <FaRegEye className="text-sky-600" />
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to="/">
                    <FaRegTrashAlt className="text-red-500" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
