import { Link, useParams } from "react-router-dom";

// ICONS
import { MdOutlineDescription } from "react-icons/md";
import { PiKanbanLight } from "react-icons/pi";

// STATE
import { KanbanType } from "../../types/types";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { Card, CardContent, CardHeader } from "../../@/components/ui/card";

export type KanbanCardProps = {
  kanban: KanbanType;
};

export const KanbanCard = ({ kanban }: KanbanCardProps) => {
  const { clientId, projectId, organizationId } = useParams();

  const { darkMode } = useAppSelector((state: RootState) => state.theme);

  const { title, description } = kanban;
  return (
    <Link
      to={`/organizations/${organizationId}/clients/${clientId}/projects/${projectId}/kanbans/${kanban.id}`}
    >
      <Card
        className={`h-auto border w-72 my-2 rounded-xl border-t-green-700 shadow-md p-3 mx-2 transform xl:translate-x-0 ease-in-out transition duration-500 ${
          darkMode
            ? "bg-sky-700 hover:bg-sky-600 transition ease-in-out delay-50 duration-200"
            : "bg-slate-50 hover:bg-slate-200 transition ease-in-out delay-50 duration-200"
        } flex flex-col items-center hover:scale-x-105 hover:scale-y-105 transition ease-in-out duration-200`}
      >
        <CardHeader className="flex flex-row items-center">
          <PiKanbanLight className="mr-2" />
          <h2 className="my-2 font-bold">{title}</h2>
        </CardHeader>
        <CardContent className="flex flex-row items-center">
          <MdOutlineDescription className="mr-2" />
          <p className="my-2">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
