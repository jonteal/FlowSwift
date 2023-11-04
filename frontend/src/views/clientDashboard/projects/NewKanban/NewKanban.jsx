import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_KANBANS } from "../../../../graphql/queries/kanbanQueries";

// COMPONENTS
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { KanbanCard } from "../../../../components/kanban/KanbanCard/KanbanCard";

export const NewKanban = () => {
  const { projectId, clientId } = useParams();

  const { loading, error, data } = useQuery(GET_KANBANS, {
    variables: { projectId },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  return (
    <div className="mx-2">
      <DynamicButton color="red" type="link" link="build" className="my-3">
        New Kanban
      </DynamicButton>

      <div className="mt-5 flex flex-row flex-wrap">
        {data.kanbans.map((kanban) => (
          <Link
            key={kanban.id}
            to={`/clients/${clientId}/projects/${projectId}/kanbans/${kanban.id}`}
          >
            <KanbanCard key={kanban.id} kanban={kanban} />
          </Link>
        ))}
      </div>
    </div>
  );
};
