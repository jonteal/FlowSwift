// COMPONENTS
import { ProjectsTableItem } from "../ProjectsTableItem/ProjectsTableItem";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../@/components/ui/table";

// STATE
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";

// TYPES
import { ProjectType } from "../../types/types";

export type ProjectsTableProps = {
  projects: ProjectType[];
  searchTerm: string;
};

export const ProjectsTable = ({ projects, searchTerm }: ProjectsTableProps) => {
  const { darkMode } = useAppSelector((state: RootState) => state.theme);

  return (
    <div className="border w-full flex flex-col">
      <Table>
        <TableCaption>A list of your client's projects</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead className="w-[100px]">Project Name</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Estimate</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val?.client.firstName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return val;
              } else if (
                val?.title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              } else if (
                val?.client.lastName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((project, index) => (
              <ProjectsTableItem
                index={index}
                key={project.id}
                project={project}
              />
            ))}
        </TableBody>
      </Table>
      {/* <table className="table-auto overflow-x-scroll">
        <thead>
          <tr>
            <th
              className={`${
                darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
              } w-auto text-left pl-2 border font-semibold`}
            >
              #
            </th>
            <th
              className={`${
                darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
              } font-semibold w-2/12 text-left pl-2 border`}
            >
              Project Name
            </th>
            <th
              className={`${
                darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
              } font-semibold w-2/12 text-left pl-2 border`}
            >
              Client
            </th>
            <th
              className={`${
                darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
              } font-semibold w-2/12 text-left pl-2 border`}
            >
              Status
            </th>
            <th
              className={`${
                darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
              } font-semibold w-2/12 text-left pl-2 border`}
            >
              Start Date
            </th>
            <th
              className={`${
                darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
              } font-semibold w-2/12 text-left pl-2 border`}
            >
              Deadline
            </th>
            <th
              className={`${
                darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
              } font-semibold w-2/12 text-left pl-2 border`}
            >
              Budget
            </th>
            <th
              className={`${
                darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
              } font-semibold w-2/12 text-left pl-2 border`}
            >
              Estimate
            </th>
            <th
              className={`${
                darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
              } font-semibold w-2/12 text-left pl-2 border`}
            ></th>
            <th
              className={`${
                darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
              } font-semibold w-2/12 text-left pl-2 border`}
            ></th>
          </tr>
        </thead>
        <tbody>
          {projects
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val?.client.firstName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return val;
              } else if (
                val?.title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              } else if (
                val?.client.lastName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((project, index) => (
              <ProjectsTableItem
                index={index}
                key={project.id}
                project={project}
              />
            ))}
        </tbody>
      </table> */}
    </div>
  );
};
