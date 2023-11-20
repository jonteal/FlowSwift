import { Link } from "react-router-dom";

// ICONS
import { BsPersonCircle, BsFillCalendarDateFill } from "react-icons/bs";
import { FaProjectDiagram } from "react-icons/fa";

// COMPONENTS
import { StatusBadge } from "../reusable/StatusBadge/StatusBadge";

// STATE
import { useSelector } from "react-redux";

export const ProjectPageCard = ({ project }) => {
  const { darkMode } = useSelector((state) => state.theme);

  const {
    statusBadge,
    clientName,
    description: projectDescription,
    budget,
    estimate,
    dates,
  } = useSelector((state) => state.projects);

  const {
    title,
    status,
    client,
    description,
    clientBudget,
    projectEstimate,
    startDate,
    deadline,
  } = project;
  return (
    <Link to={`/clients/${project.client.id}/projects/${project.id}/profile`}>
      <div
        className={`mt-3 border w-72 my-0 md:my-2 rounded-xl shadow-md p-3 mx-2 transform xl:translate-x-0 ease-in-out transition duration-500  ${
          darkMode
            ? "bg-sky-700 hover:bg-sky-600 transition ease-in-out delay-50 duration-200"
            : "bg-slate-50 hover:bg-slate-200 transition ease-in-out delay-50 duration-200"
        } flex flex-col items-center hover:scale-x-105 hover:scale-y-105 transition ease-in-out duration-200`}
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
        {projectDescription && (
          <div className="my-2">
            <p className="my-2">{description}</p>
          </div>
        )}
        <div className="flex flex-row items-center">
          {budget && (
            <div className="my-2 mr-5 flex flex-col">
              <p
                className={`${
                  darkMode ? "text-slate-100" : "text-slate-600"
                } font-light text-left text-sm`}
              >
                Budget
              </p>
              <p className="my-2">$ {clientBudget}</p>
            </div>
          )}
          {estimate && (
            <div className="my-2 ml-5 flex flex-col">
              <p
                className={`${
                  darkMode ? "text-slate-100" : "text-slate-600"
                } font-light text-left text-sm`}
              >
                Project Estimate
              </p>
              <p className="my-2">$ {projectEstimate}</p>
            </div>
          )}
        </div>
        {dates && (
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center mr-2">
              <BsFillCalendarDateFill className="mr-2" />
              <p className="my-2">{startDate ? startDate : "No Start Date"}</p>
            </div>
            <div>-</div>
            <div className="flex flex-row items-center ml-2">
              <p className="my-2">{deadline ? deadline : "No deadline"}</p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};
