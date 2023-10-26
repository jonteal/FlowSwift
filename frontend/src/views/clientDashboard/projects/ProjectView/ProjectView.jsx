import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_PROJECT } from "../../../../graphql/queries/projectQueries";

// COMPONENTS
import { ProjectViewNav } from "../../../../components/nav/ProjectViewNav/ProjectViewNav";

export const ProjectView = () => {
  const { id } = useParams();

  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
  } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (projectLoading) return <p>Loading...</p>;
  if (projectError) return <p>There was an error loading project...</p>;

  return (
    <div className="w-full">
      <ProjectViewNav projectData={projectData} />
      <Outlet />
    </div>
  );
};
