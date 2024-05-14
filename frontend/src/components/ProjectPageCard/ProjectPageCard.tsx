import { Link, useParams } from "react-router-dom";

// ICONS
import { BsPersonCircle, BsFillCalendarDateFill } from "react-icons/bs";
import { FaProjectDiagram } from "react-icons/fa";

// COMPONENTS
import { StatusBadge } from "../reusable/StatusBadge/StatusBadge";

// STATE
import { PriorityBadge } from "../reusable/PriorityBadge/PriorityBadge";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { ProjectType } from "../../types/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../@/components/ui/card";

export type ProjectPageCardProps = {
  project: ProjectType;
};

export const ProjectPageCard = ({ project }: ProjectPageCardProps) => {
  const { darkMode } = useAppSelector((state: RootState) => state.theme);
  const { organizationId } = useParams();

  const {
    statusBadge,
    clientName,
    description: projectDescription,
    budget,
    estimate,
    dates,
    projectOwner,
    priorityBadge,
  } = useAppSelector((state: RootState) => state.projects);

  const {
    title,
    status,
    client,
    description,
    clientBudget,
    projectEstimate,
    startDate,
    deadline,
    user,
    priority,
  } = project;
  return (
    <>
      <Link
        to={`/organizations/${organizationId}/clients/${project.client.id}/projects/${project.id}/profile`}
      >
        <Card className="mt-3 border w-72 my-0 md:my-2 rounded-xl shadow-md p-3 mx-2 transform xl:translate-x-0 ease-in-out transition duration-500 flex flex-col items-center hover:scale-x-105 hover:scale-y-105 transition ease-in-out duration-200">
          <CardHeader>
            <CardTitle className="flex flex-row justify-center items-center">
              <FaProjectDiagram className="mr-2" />
              <h2 className="my-2 font-bold">{title}</h2>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-center items-center">
            {clientName && (
              <div className="flex flex-row items-center">
                <BsPersonCircle className="mr-2" />
                <p className="my-2">
                  {client.firstName + " " + client.lastName}
                </p>
              </div>
            )}
            {statusBadge && (
              <div className="my-2">
                <StatusBadge status={status} />
              </div>
            )}

            {priorityBadge && (
              <div className="my-2">
                <PriorityBadge priority={priority} />
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
                  <p className="my-2">
                    {startDate ? startDate : "No Start Date"}
                  </p>
                </div>
                <div>-</div>
                <div className="flex flex-row items-center ml-2">
                  <p className="my-2">{deadline ? deadline : "No deadline"}</p>
                </div>
              </div>
            )}
            {projectOwner && (
              <div className="flex flex-row items-center">
                <p className="my-2">Owner: {user.name}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </>
  );
};
