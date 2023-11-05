import { Link } from "react-router-dom";
import { StatusBadge } from "../reusable/StatusBadge/StatusBadge";
import { BsPersonCircle } from "react-icons/bs";
import { FaProjectDiagram } from "react-icons/fa";

// STATE
import { useContext } from "react";
import { ThemeContext } from "../../context";
import { useSelector } from "react-redux";

export const ProjectPageCard = ({ project }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const { statusBadge, clientName } = useSelector((state) => state.projects);

  const { title, status, client } = project;
  return (
    <Link to={`/clients/${project.client.id}/projects/${project.id}/profile`}>
      <div
        className={`border w-72 my-2 rounded-xl shadow-md p-3 mx-2 transform xl:translate-x-0 ease-in-out transition duration-500  ${
          darkMode
            ? "bg-sky-700 hover:bg-sky-600 transition ease-in-out delay-50 duration-200"
            : "bg-slate-50 hover:bg-slate-100 transition ease-in-out delay-50 duration-200"
        } flex flex-col items-center`}
      >
        <div className="flex flex-row items-center">
          <FaProjectDiagram className="mr-2" />
          <h2 className="my-2 font-bold">{title}</h2>
        </div>
        {clientName && (
          <div className="flex flex-row items-center">
            <BsPersonCircle className="mr-2" />
            <p className="my-2">{client.firstName + " " + client.lastName}</p>
          </div>
        )}
        {statusBadge && (
          <div className="my-2">
            <StatusBadge status={status} />
          </div>
        )}
      </div>
    </Link>
  );
};
