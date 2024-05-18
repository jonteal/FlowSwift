import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_KANBANS } from "../../../../graphql/queries/kanbanQueries";

// COMPONENTS
import { Button } from "../../../../@/components/ui/button";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { KanbanCard } from "../../../../components/kanban/KanbanCard";
import { KanbanType } from "../../../../types/types";

export const NewKanban = () => {
  const { projectId } = useParams();

  const { loading, error, data } = useQuery(GET_KANBANS, {
    variables: { projectId },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  return (
    <div className="mx-2">
      <Button asChild>
        <Link to="build" className="my-3">
          New Kanban
        </Link>
      </Button>
      <div className="mt-5 flex flex-col md:flex-row items-center flex-wrap">
        {data.kanbans.map((kanban: KanbanType) => (
          <KanbanCard key={kanban.id} kanban={kanban} />
        ))}
      </div>
    </div>
  );
};
