import { useParams, useNavigate, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import {
  GET_ORGANIZATION_PROJECTS,
  GET_PROJECT,
} from "../../../graphql/queries/projectQueries";
import { DELETE_PROJECT } from "../../../graphql/mutations/projectMutations";

// COMPONENTS
import { Button } from "../../../@/components/ui/button";
import { NameValuePair } from "../../../components/reusable/NameValuePair/NameValuePair";
import { StatusBadge } from "../../../components/reusable/StatusBadge/StatusBadge";
import { DynamicContainer } from "../../../components/reusable/DynamicContainer/DynamicContainer";

// STATE
// import { useSelector } from "react-redux";
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";

export const ProjectProfile = () => {
  const { darkMode } = useAppSelector((state: RootState) => state.theme);

  const { projectId, clientId, organizationId } = useParams();
  const navigate = useNavigate();

  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
  } = useQuery(GET_PROJECT, {
    variables: { id: projectId },
  });

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate(`/clients/${clientId}/projects`),
    refetchQueries: [
      { query: GET_ORGANIZATION_PROJECTS, variables: { organizationId } },
      { query: GET_ORGANIZATION_PROJECTS, variables: { organizationId } },
    ],
  });

  if (projectLoading) return <p>Loading...</p>;
  if (projectError) return <p>There was an error loading project...</p>;

  const {
    title,
    description,
    notes,
    status,
    startDate,
    deadline,
    clientBudget,
    projectEstimate,
    user,
  } = projectData.project;

  return (
    <DynamicContainer className="mt-2">
      <div className="flex flex-row">
        <div
          className={`rounded-xl transform xl:translate-x-0 ease-in-out transition duration-500  ${
            darkMode ? "bg-sky-800" : "bg-slate-50"
          } mx-0 md:mx-2 mt-3 p-2 w-full`}
        >
          <div className="w-full flex flex-row items-center justify-end">
            <Button asChild>
              <Link
                to={`/organizations/$organizationId/clients/${clientId}/projects/${projectId}/edit`}
              >
                Edit
              </Link>
            </Button>

            <Button onClick={() => deleteProject}>Delete</Button>
          </div>
          <>
            <NameValuePair type="header" name="Title" value={title} />
            <NameValuePair name="Description" value={description} />
            <NameValuePair name="Notes" value={notes} />
            {/* <NameValuePair name="Status">
              <StatusBadge className="mt-2" position="left" status={status} />
            </NameValuePair> */}
            <NameValuePair name="Start Date" value={startDate} />
            <NameValuePair name="Deadline" value={deadline} />
            <NameValuePair name="Client Budget" value={`$ ${clientBudget}`} />
            <NameValuePair
              name="Project Estimate"
              value={`$ ${projectEstimate}`}
            />
            <NameValuePair name="Project Manager" value={user?.name} />
          </>
        </div>
      </div>
    </DynamicContainer>
  );
};
