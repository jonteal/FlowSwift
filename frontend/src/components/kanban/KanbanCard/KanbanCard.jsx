import { Link, useParams } from "react-router-dom";

// ICONS
import { MdOutlineDescription } from "react-icons/md";
import { PiKanbanLight } from "react-icons/pi";

// STATE
import { useSelector } from "react-redux";

export const KanbanCard = ({ kanban }) => {
  const { clientId, projectId } = useParams();

  const { darkMode } = useSelector((state) => state.theme);

  const { title, description } = kanban;
  return (
    <Link
      to={`/clients/${clientId}/projects/${projectId}/kanbans/${kanban.id}`}
    >
      <div
        className={`h-auto border w-72 my-2 rounded-xl border-t-green-700 shadow-md p-3 mx-2 transform xl:translate-x-0 ease-in-out transition duration-500 ${
          darkMode
            ? "bg-sky-700 hover:bg-sky-600 transition ease-in-out delay-50 duration-200"
            : "bg-slate-50 hover:bg-slate-100 transition ease-in-out delay-50 duration-200"
        } flex flex-col items-center`}
      >
        <div className="flex flex-row items-center">
          <PiKanbanLight className="mr-2" />
          <h2 className="my-2 font-bold">{title}</h2>
        </div>
        <div className="flex flex-row items-center">
          <MdOutlineDescription className="mr-2" />
          <p className="my-2">{description}</p>
        </div>
      </div>
    </Link>
  );
};
