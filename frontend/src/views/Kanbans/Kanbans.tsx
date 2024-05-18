import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_ALL_KANBANS } from "../../graphql/queries/kanbanQueries";
import { GET_USER } from "../../graphql/queries/userQueries";

// COMPONENTS
import { Spinner } from "../../components/reusable/Spinner/Spinner";
import { KanbanPageCard } from "../../components/kanban/KanbanPageCard";
import { FiltersList } from "../../components/reusable/FiltersList/FiltersList";

// STATE
import {
  setKanbanCardClientOff,
  setKanbanCardClientOn,
  setKanbanCardDescriptionOff,
  setKanbanCardDescriptionOn,
  setKanbanCardProjectOff,
  setKanbanCardProjectOn,
} from "../../slices/kanbanSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { PageHeadline } from "../../components/reusable/PageHeadline/PageHeadline";
import { Body } from "../../components/reusable/Body/Body";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { KanbanType } from "../../types/types";
import { Button } from "../../@/components/ui/button";

export const Kanbans = () => {
  const { organizationId } = useParams();

  const { userInfo } = useAppSelector((state: RootState) => state.auth);

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USER, {
    variables: { id: userInfo._id },
  });

  console.log("userData: ", userData);

  const { loading, error, data } = useQuery(GET_ALL_KANBANS, {
    variables: { id: organizationId },
  });

  const [isFilterOptionsOpen, setIsFilterOptionsOpen] = useState(false);

  const dispatch = useDispatch();

  const { cardDescription, cardClient, cardProject } = useAppSelector(
    (state: RootState) => state.kanban
  );

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  const handleOpenFilters = () => {
    setIsFilterOptionsOpen(!isFilterOptionsOpen);
  };

  const handleKanbanCardDescriptionToggle = () => {
    cardDescription
      ? dispatch(setKanbanCardDescriptionOff())
      : dispatch(setKanbanCardDescriptionOn());
  };

  const handleKanbanCardClientToggle = () => {
    cardClient
      ? dispatch(setKanbanCardClientOff())
      : dispatch(setKanbanCardClientOn());
  };

  const handleKanbanCardProjectToggle = () => {
    cardProject
      ? dispatch(setKanbanCardProjectOff())
      : dispatch(setKanbanCardProjectOn());
  };

  const kanbanCardFilters = [
    {
      name: "Description",
      toggle: handleKanbanCardDescriptionToggle,
      value: cardDescription,
      isChecked: cardDescription,
      ariaLabel: "Description filter",
    },
    {
      name: "Client",
      toggle: handleKanbanCardClientToggle,
      value: cardClient,
      isChecked: cardClient,
      ariaLabel: "Client filter",
    },
    {
      name: "Project",
      toggle: handleKanbanCardProjectToggle,
      value: cardProject,
      isChecked: cardProject,
      ariaLabel: "Project filter",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <button
        className="border bg-sky-300 px-3 py-1 rounded-lg w-1/12 mt-3"
        onClick={handleOpenFilters}
      >
        Filters
      </button>
      {/* <div className="w-full">
        {isFilterOptionsOpen && <FiltersList filters={kanbanCardFilters} />}
      </div> */}

      {data.allKanbans.length > 0 ? (
        <div className="flex flex-col items-center md:flex-row flex-wrap mt-3 w-full p-3">
          <div className="flex md:flex-row flex-wrap mx-auto flex-col">
            {data.allKanbans.map((kanban: KanbanType) => (
              <KanbanPageCard key={kanban.id} kanban={kanban} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <Body className="mt-5 italic">
            You don't have any kanbans. Would you like to add one?
          </Body>
          <Button className="text-slate-700">Add Kanban</Button>
        </>
      )}
    </div>
  );
};
