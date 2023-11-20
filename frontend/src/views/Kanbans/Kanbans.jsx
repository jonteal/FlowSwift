import { useQuery } from "@apollo/client";
import { GET_ALL_KANBANS } from "../../graphql/queries/kanbanQueries";
import { Spinner } from "../../components/reusable/Spinner/Spinner";
import { KanbanPageCard } from "../../components/kanban/KanbanPageCard/KanbanPageCard";

export const Kanbans = () => {
  const { loading, error, data } = useQuery(GET_ALL_KANBANS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  console.log("data: ", data);
  return (
    <div className="flex flex-col items-center md:flex-row flex-wrap mt-3 w-full p-3">
      <div className="flex md:flex-row flex-wrap mx-auto flex-col">
        {data.allKanbans.map((kanban) => (
          <KanbanPageCard key={kanban.id} kanban={kanban} />
        ))}
      </div>
    </div>
  );
};
