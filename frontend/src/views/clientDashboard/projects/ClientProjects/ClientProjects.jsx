import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

// GRAPHQL
import { GET_CLIENT_PROJECTS } from "../../../../graphql/queries/projectQueries";

// COMPONENTS
import { ProjectPageCard } from "../../../../components/ProjectPageCard/ProjectPageCard";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";
import { FiltersList } from "../../../../components/reusable/FiltersList/FiltersList";
import { Switch } from "../../../../components/reusable/Switch/Switch";
import { DynamicContainer } from "../../../../components/reusable/DynamicContainer/DynamicContainer";

// STATE
import { useDispatch, useSelector } from "react-redux";
import { useState, useContext } from "react";
import {
  setGridViewOn,
  setGridViewOff,
  setStatusBadgeOff,
  setStatusBadgeOn,
  setClientNameOff,
  setClientNameOn,
  setDescriptionOff,
  setDescriptionOn,
  setBudgetOn,
  setBudgetOff,
  setDatesOff,
  setDatesOn,
  setEstimateOff,
  setEstimateOn,
} from "../../../../slices/projectsSlice";
import { ThemeContext } from "../../../../context";
import { ProjectsTableItem } from "../../../../components/ProjectsTableItem/ProjectsTableItem";
import { ProjectsAccordion } from "../../../../components/Accordions/ProjectsAccordion.jsx/ProjectsAccordion";

export const ClientProjects = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const { clientId } = useParams();
  const [isFilterOptionsOpen, setIsFilterOptionsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const {
    gridView,
    statusBadge,
    clientName,
    description,
    budget,
    dates,
    estimate,
  } = useSelector((state) => state.projects);

  const handleGridViewToggle = () => {
    gridView ? dispatch(setGridViewOff()) : dispatch(setGridViewOn());
  };

  const handleStatusBadgeToggle = () => {
    statusBadge ? dispatch(setStatusBadgeOff()) : dispatch(setStatusBadgeOn());
  };

  const handleClientNameToggle = () => {
    clientName ? dispatch(setClientNameOff()) : dispatch(setClientNameOn());
  };

  const handleDescriptionToggle = () => {
    description ? dispatch(setDescriptionOff()) : dispatch(setDescriptionOn());
  };

  const handleBudgetToggle = () => {
    budget ? dispatch(setBudgetOff()) : dispatch(setBudgetOn());
  };

  const handleEstimateToggle = () => {
    estimate ? dispatch(setEstimateOff()) : dispatch(setEstimateOn());
  };

  const handleDatesToggle = () => {
    dates ? dispatch(setDatesOff()) : dispatch(setDatesOn());
  };

  const handleOpenFilters = () => {
    setIsFilterOptionsOpen(!isFilterOptionsOpen);
  };

  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(GET_CLIENT_PROJECTS, {
    variables: { clientId },
  });

  if (projectsLoading) return <Spinner />;
  if (projectsError) return <p>There was an error loading the project feed</p>;

  const projectCardFilters = [
    {
      name: "Status Badge",
      toggle: handleStatusBadgeToggle,
      value: statusBadge,
      isChecked: statusBadge,
      ariaLabel: "Status Badge filter",
    },
    {
      name: "Client Name",
      toggle: handleClientNameToggle,
      value: clientName,
      isChecked: clientName,
      ariaLabel: "Client Name filter",
    },
    {
      name: "Description",
      toggle: handleDescriptionToggle,
      value: description,
      isChecked: description,
      ariaLabel: "Project Description filter",
    },
    {
      name: "Budget",
      toggle: handleBudgetToggle,
      value: budget,
      isChecked: budget,
      ariaLabel: "Project Budget filter",
    },
    {
      name: "Dates",
      toggle: handleDatesToggle,
      value: dates,
      isChecked: dates,
      ariaLabel: "Project Dates filter",
    },
    {
      name: "Project Estimate",
      toggle: handleEstimateToggle,
      value: estimate,
      isChecked: estimate,
      ariaLabel: "Project Estimate filter",
    },
  ];

  return (
    <DynamicContainer className="w-full">
      {projectsData.clientProjects.length === 0 ? (
        <div className="rounded-xl bg-slate-50 mx-2 py-3 px-4 w-full">
          <DynamicButton
            color="red"
            link={`/clients/${clientId}/projects/addProject`}
            type="link"
          >
            Add Project
          </DynamicButton>
          <p className="mt-4">
            This client does not have any current projects.
          </p>
        </div>
      ) : (
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between items-start">
            <DynamicButton
              color="red"
              link={`/clients/${clientId}/projects/addProject`}
              type="link"
              className="ml-2"
            >
              Add Project
            </DynamicButton>

            <input
              type="text"
              placeholder="Search..."
              onChange={(event) => setSearchTerm(event.target.value)}
              className="searchBar w-40 border rounded-xl pl-2 ml-5 mt-3 text-slate-700"
            />

            {projectsData.clientProjects.length > 0 && (
              <button
                className="border bg-sky-500 text-slate-50 px-4 py-1 mb-4 rounded-lg mx-2"
                onClick={handleOpenFilters}
              >
                Filters
              </button>
            )}
            <Switch isChecked={gridView} changeHandler={handleGridViewToggle} />
          </div>
          <div>
            {isFilterOptionsOpen && (
              <FiltersList filters={projectCardFilters} />
            )}
          </div>
          <div className="flex flex-col items-center md:flex-row flex-wrap mt-3 w-full p-3">
            {gridView ? (
              <div className="flex md:flex-row flex-wrap mx-auto flex-col">
                {projectsData.clientProjects
                  .filter((val) => {
                    if (searchTerm === "") {
                      return val;
                    } else if (
                      val?.client.firstName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    } else if (
                      val?.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    } else if (
                      val?.client.lastName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((project) => (
                    <ProjectPageCard key={project.id} project={project} />
                  ))}
              </div>
            ) : (
              <ProjectsAccordion
                searchTerm={searchTerm}
                projects={projectsData.clientProjects}
              />
            )}
          </div>
        </div>
      )}
    </DynamicContainer>
  );
};
