import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_PROJECT_ACTIVITY_COMMENTS } from "../../../../graphql/queries/projectActivityCommentQueries";

import { ProjectCommentFeed } from "../../../../components/ProjectCommentFeed/ProjectCommentFeed";
// import ProjectHistory from "../../../../components/ProjectHistory/ProjectHistory";

export const ProjectActivity = () => {
  const { projectId } = useParams();

  const {
    loading: projectActivityCommentsLoading,
    error: projectActivityCommentsError,
    data: projectActivityCommentData,
  } = useQuery(GET_PROJECT_ACTIVITY_COMMENTS, { variables: { projectId } });

  if (projectActivityCommentsLoading) return <p>Loading...</p>;
  if (projectActivityCommentsError)
    return <p>There was an error loading comments...</p>;

  return (
    <div className="flex flex-row w-full h-screen">
      <div className="w-full">
        <ProjectCommentFeed
          projectId={projectId}
          comments={projectActivityCommentData.projectActivityComments}
        />
      </div>
      {/* <div className="w-1/2">
        <ProjectHistory />
      </div> */}
    </div>
  );
};
