import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import {
  GET_PROJECT,
  GET_PROJECTS,
} from "../../../../graphql/queries/projectQueries";
import { DELETE_PROJECT } from "../../../../graphql/mutations/projectMutations";

// COMPONENTS
import { NameValuePair } from "../../../../components/reusable/NameValuePair/NameValuePair";
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";
import { StatusBadge } from "../../../../components/reusable/StatusBadge/StatusBadge";

// STATE
import { useContext } from "react";
import { ThemeContext } from "../../../../context";

export const ProjectProfile = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const { projectId, clientId } = useParams();
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
    refetchQueries: [{ query: GET_PROJECTS }, { query: GET_PROJECTS }],
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
  } = projectData.project;

  return (
    <div className="px-0 flex flex-col w-full h-screen">
      <div className="flex flex-row">
        <div
          className={`rounded-xl transform xl:translate-x-0 ease-in-out transition duration-500  ${
            darkMode ? "bg-sky-800" : "bg-slate-50"
          } mx-0 md:mx-2 mt-3 p-2 w-full`}
        >
          <div className="w-full flex flex-row items-center justify-end">
            <DynamicButton
              type="link"
              color="lightBlue"
              link={`/clients/${clientId}/projects/${projectId}/edit`}
            >
              Edit
            </DynamicButton>

            <div onClick={deleteProject}>
              <DynamicButton color="red" type="delete">
                Delete
              </DynamicButton>
            </div>
          </div>
          <>
            <NameValuePair type="header" name="Title" value={title} />
            <NameValuePair name="Description" value={description} />
            <NameValuePair name="Notes" value={notes} />
            <NameValuePair name="Status">
              <StatusBadge className="mt-2" position="left" status={status} />
            </NameValuePair>
            <NameValuePair name="Start Date" value={startDate} />
            <NameValuePair name="Deadline" value={deadline} />
            <NameValuePair name="Client Budget" value={`$ ${clientBudget}`} />
            <NameValuePair
              name="Project Estimate"
              value={`$ ${projectEstimate}`}
            />
          </>
        </div>
      </div>
    </div>
  );
};
