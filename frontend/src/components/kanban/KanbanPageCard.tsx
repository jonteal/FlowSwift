import { PiKanbanLight } from "react-icons/pi";
import { BsPersonCircle } from "react-icons/bs";
import { FaProjectDiagram } from "react-icons/fa";

import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { KanbanType } from "../../types/types";
import { Card, CardContent, CardHeader } from "../../@/components/ui/card";

export type KanbanPageCardProps = {
  kanban: KanbanType;
};

export const KanbanPageCard = ({ kanban }: KanbanPageCardProps) => {
  const { organizationId } = useParams();

  const { title, description, project } = kanban;

  const { darkMode } = useAppSelector((state: RootState) => state.theme);

  const { cardDescription, cardClient, cardProject } = useAppSelector(
    (state: RootState) => state.kanban
  );

  return (
    <Link
      to={`/organizations/${organizationId}/clients/${project.client.id}/projects/${project.id}/kanbans/${kanban.id}`}
    >
      <Card
        className={`mt-3 border w-72 my-0 md:my-2 rounded-xl shadow-md p-3 mx-2 transform xl:translate-x-0 ease-in-out transition duration-500  ${
          darkMode
            ? "bg-sky-700 hover:bg-sky-600 transition ease-in-out delay-50 duration-200"
            : "bg-slate-50 hover:bg-slate-200 transition ease-in-out delay-50 duration-200"
        } flex flex-col items-center hover:scale-x-105 hover:scale-y-105 transition ease-in-out duration-200`}
      >
        <CardHeader className="flex flex-row items-center">
          <PiKanbanLight className="mr-3 text-lg" />
          <h3 className="font-bold py-4">{title}</h3>
        </CardHeader>
        <CardContent>
          {cardDescription && (
            <div className="my-2">
              <p className="my-2">{description}</p>
            </div>
          )}

          {cardClient && (
            <div className="flex flex-row items-center">
              <BsPersonCircle className="mr-2" />
              <p className="my-2">
                {`${project.client.firstName} ${project.client.lastName}`}
              </p>
            </div>
          )}
          {cardProject && (
            <div className="flex flex-row items-center">
              <FaProjectDiagram className="mr-2" />
              <p className="my-2">{project.title}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
