import { useParams } from "react-router-dom";
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";
import { GET_KANBANS } from "../../../../graphql/queries/kanbanQueries";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { useQuery } from "@apollo/client";

export const NewKanban = () => {
  const { projectId } = useParams();

  const { loading, error, data } = useQuery(GET_KANBANS, {
    variables: { projectId },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  console.log("data: ", data);
  return (
    <div className="mx-2">
      <DynamicButton color="red" type="link" link="build" className="my-3">
        New Kanban
      </DynamicButton>

      <div className="mt-5 flex flex-row flex-wrap">
        {data.kanbans.map((kanban) => (
          <div className="border w-1/4 rounded-lg h-20 flex flex-col items-center m-2">
            <p>{kanban.title}</p>
            <p>{kanban.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
