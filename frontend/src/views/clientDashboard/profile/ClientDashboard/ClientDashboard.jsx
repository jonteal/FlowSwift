// LIBRARIES
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// COMPONENTS
import { ClientCard } from "../../../../components/ClientCard/ClientCard";
import { ClientCommentFeed } from "../../../../components/ClientCommentFeed/ClientCommentFeed";

// GRAPHQL
import { GET_CLIENT } from "../../../../graphql/queries/clientQueries";
import { GET_CLIENT_ACTIVITY_COMMENTS } from "../../../../graphql/queries/clientActivityCommentQueries";

export const ClientDashboard = () => {
  const { clientId } = useParams();

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENT, {
    variables: { id: clientId },
  });

  const {
    loading: clientActivityCommentsLoading,
    error: clientActivityCommentsError,
    data: clientActivityCommentData,
  } = useQuery(GET_CLIENT_ACTIVITY_COMMENTS, {
    variables: { clientId },
  });

  if (clientActivityCommentsLoading) return <p>Loading...</p>;
  if (clientActivityCommentsError) return <p>There was an error...</p>;

  return (
    <div className="w-full flex md:flex-row flex-col">
      <div className="w-full mx-2 rounded-xl">
        {!clientLoading && !clientError && (
          <ClientCard clientData={clientData} />
        )}
      </div>
      <div className="w-full">
        {!clientLoading && !clientError && (
          <ClientCommentFeed
            comments={clientActivityCommentData.clientActivityComments}
            clientId={clientData.client.id}
          />
        )}
      </div>
    </div>
  );
};
