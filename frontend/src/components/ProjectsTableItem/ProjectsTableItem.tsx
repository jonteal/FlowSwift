import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// ICONS
import { FaRegEye } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";

// COMPONENTS
import { DeleteProject } from "../../views/Projects/DeleteProject";

// STATE
import { RootState } from "../../store/store";
// import { useSelector } from "react-redux";

// UTILS
import { camelCaseToWords } from "../../utils/format";
import { ProjectType } from "../../types/types";
import { useAppSelector } from "../../store/hooks";
import { TableCell, TableRow } from "../../@/components/ui/table";
import { DeleteModal } from "../modals/DeleteModal/DeleteModal";

export type ProjectsTableItemProps = {
  project: ProjectType;
  index: number;
};

export const ProjectsTableItem = ({
  project,
  index,
}: ProjectsTableItemProps) => {
  const { darkMode } = useAppSelector((state: RootState) => state.theme);
  const { organizationId } = useParams();

  const {
    projectName,
    projectClient,
    projectStatus,
    projectStartDate,
    projectDeadline,
    projectPriority,
    projectBudget,
    projectEstimate,
    projectOwnerTable,
  } = useAppSelector((state: RootState) => state.projects);

  const [statusColor, setStatusColor] = useState("");
  const [priorityColor, setPriorityColor] = useState("");

  const {
    id,
    status,
    priority,
    title,
    user,
    client,
    startDate,
    deadline,
    clientBudget,
    projectEstimate: estimate,
  } = project;

  useEffect(() => {
    if (status === "notStarted") {
      setStatusColor("bg-yellow-500");
    } else if (status === "inProgress") {
      setStatusColor("bg-green-600");
    } else if (status === "completed") {
      setStatusColor("bg-sky-600");
    } else if (status === "paused") {
      setStatusColor("bg-red-600");
    } else if (status === "needsAttention") {
      setStatusColor("bg-orange-500");
    }
  }, [status]);

  useEffect(() => {
    if (priority === "low") {
      setPriorityColor("bg-sky-500");
    } else if (priority === "medium") {
      setPriorityColor("bg-green-600");
    } else if (priority === "high") {
      setPriorityColor("bg-orange-500");
    }
  }, [priority]);

  return (
    <>
      <TableRow key={id}>
        <TableCell className="text-left">{index + 1}</TableCell>
        {projectName && <TableCell className="text-left">{title}</TableCell>}
        <TableCell className="text-left">{`${client.firstName} ${client.lastName} `}</TableCell>
        <TableCell className="text-left">{user.name}</TableCell>
        <TableCell className="text-left">{camelCaseToWords(status)}</TableCell>
        <TableCell className="text-left">{startDate}</TableCell>
        <TableCell className="text-left">{deadline}</TableCell>
        <TableCell className="text-left">
          {priority ? camelCaseToWords(priority) : ""}
        </TableCell>
        <TableCell className="text-left">{clientBudget}</TableCell>
        <TableCell className="text-left">{estimate}</TableCell>
        <TableCell className="text-left">
          <Link
            to={`/organizations/${organizationId}/clients/${client.id}/projects/${id}/profile`}
          >
            <FaRegEye
              className={`${darkMode ? "text-sky-200" : "text-sky-600"} mr-2`}
            />
          </Link>
        </TableCell>

        <TableCell>
          <DeleteProject subject="Project" projectId={id}>
            <FaRegTrashAlt className="text-red-500 self-center mx-1" />
          </DeleteProject>
        </TableCell>
      </TableRow>
      {/* <tr key={project.id}>
        <td
          className={`${
            darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
          } font-light text-left border pl-2 pr-2`}
        >
          {index + 1}
        </td>
        {projectName && (
          <td
            className={`${
              darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
            } font-light text-left border pl-2`}
          >
            {title}
          </td>
        )}
        {projectClient && (
          <td
            className={`${
              darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
            } font-light text-left border pl-2`}
          >
            {`${client.firstName} ${client.lastName} `}
          </td>
        )}
        {projectOwnerTable && (
          <td
            className={`${
              darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
            } font-light text-left border pl-2`}
          >
            {user.name}
          </td>
        )}
        {projectStatus && (
          <td
            className={`${
              darkMode ? "bg-sky-900 text-slate-50" : "text-slate-50"
            } ${statusColor} font-light text-left border flex justify-center py-2`}
          >
            {camelCaseToWords(status)}
          </td>
        )}
        {projectStartDate && (
          <td
            className={`${
              darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
            } font-light text-left border pl-2`}
          >
            {startDate}
          </td>
        )}
        {projectDeadline && (
          <td
            className={`${
              darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
            } font-light text-left border pl-2`}
          >
            {deadline}
          </td>
        )}
        {projectPriority && (
          <td
            className={`${
              darkMode ? "bg-sky-900 text-slate-50" : "text-slate-50"
            } ${priorityColor} font-light text-left border flex justify-center py-2`}
          >
            {priority ? camelCaseToWords(priority) : ""}
          </td>
        )}
        {projectBudget && (
          <td
            className={`${
              darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
            } font-light text-left border pl-2`}
          >
            {clientBudget}
          </td>
        )}
        {projectEstimate && (
          <td
            className={`${
              darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
            } font-light text-left border pl-2`}
          >
            {estimate}
          </td>
        )}
        <td
          className={`${
            darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
          } font-light text-left border pl-2`}
        >
          <Link
            to={`/organizations/${organizationId}/clients/${client.id}/projects/${id}/profile`}
          >
            <FaRegEye
              className={`${darkMode ? "text-sky-200" : "text-sky-600"} mr-2`}
            />
          </Link>
        </td>
        <td
          className={`${
            darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
          } font-light text-left border pl-2`}
        >
          <DeleteProject subject="Project" projectId={id}>
            <FaRegTrashAlt className="text-red-500 self-center mx-1" />
          </DeleteProject>
        </td>
      </tr> */}
    </>
  );
};
