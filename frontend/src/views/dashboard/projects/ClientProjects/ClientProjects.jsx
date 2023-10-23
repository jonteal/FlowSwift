import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

// GRAPHQL
import { GET_CLIENT_PROJECTS } from "../../../../graphql/queries/projectQueries";

// COMPONENTS
import { ProjectPageCard } from "../../../../components/ProjectPageCard/ProjectPageCard";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";

export const ClientProjects = () => {
  const { clientId } = useParams();

  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(GET_CLIENT_PROJECTS, {
    variables: { clientId },
  });

  if (projectsLoading) return <Spinner />;
  if (projectsError) return <p>There was an error loading the project feed</p>;

  return (
    <div className="flex flex-row flex-wrap">
      {projectsData.clientProjects.length === 0 ? (
        <div className="rounded-xl bg-slate-50 mx-2 py-3 px-4 w-full">
          <DynamicButton color="red" link="/addProject" type="link">
            Add Project
          </DynamicButton>
          <p className="mt-4">
            This client does not have any current projects.
          </p>
        </div>
      ) : (
        projectsData.clientProjects.map((project) => (
          <ProjectPageCard key={project.id} project={project} />
        ))
      )}
    </div>
  );
};
