import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_TICKETS } from "../../../../graphql/queries/ticketQueries";

// COMPONENTS
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";
import { FiltersList } from "../../../../components/reusable/FiltersList/FiltersList";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { StatusColumn } from "../../../../components/kanban/StatusColumn/StatusColumn";

// STATE
import { useDispatch, useSelector } from "react-redux";
import {
  setSizeOff,
  setSizeOn,
  setDescriptionOff,
  setDescriptionOn,
  setCreatedDateOff,
  setCreatedDateOn,
  setOwnerOff,
  setOwnerOn,
} from "../../../../slices/ticketSlice";

export const ProjectKanban = () => {
  const { projectId } = useParams();

  const [isFilterOptionsOpen, setIsFilterOptionsOpen] = useState(false);

  const dispatch = useDispatch();
  const { size, description, createdDate, owner } = useSelector(
    (state) => state.ticket
  );

  const handleSizeToggle = () => {
    size ? dispatch(setSizeOff()) : dispatch(setSizeOn());
  };
  const handleDescriptionToggle = () => {
    description ? dispatch(setDescriptionOff()) : dispatch(setDescriptionOn());
  };
  const handleCreatedDateToggle = () => {
    createdDate ? dispatch(setCreatedDateOff()) : dispatch(setCreatedDateOn());
  };
  const handleOwnerToggle = () => {
    owner ? dispatch(setOwnerOff()) : dispatch(setOwnerOn());
  };
  const handleOpenFilters = () => {
    setIsFilterOptionsOpen(!isFilterOptionsOpen);
  };

  const {
    loading: ticketLoading,
    error: ticketError,
    data: ticketData,
  } = useQuery(GET_TICKETS, {
    variables: { projectId },
  });

  const filters = [
    { name: "Size", toggle: handleSizeToggle, value: size, isChecked: size },
    {
      name: "Description",
      toggle: handleDescriptionToggle,
      value: description,
      isChecked: description,
    },
    {
      name: "Created Date",
      toggle: handleCreatedDateToggle,
      value: createdDate,
      isChecked: createdDate,
    },
    {
      name: "Owner",
      toggle: handleOwnerToggle,
      value: owner,
      isChecked: owner,
    },
  ];

  const statusColumns = [
    {
      id: "Ready",
      state: "ready",
    },
    {
      id: "In Progress",
      state: "inProgress",
    },
    {
      id: "Done",
      state: "done",
    },
  ];

  if (ticketLoading) return <Spinner />;
  if (ticketError) return <p>Something went wrong...</p>;

  return (
    <>
      <div className="flex flex-row items-center">
        <DynamicButton
          color="red"
          className="my-3"
          link="addTicket"
          type="link"
        >
          Add Ticket
        </DynamicButton>
        <DynamicButton color="lightBlue" className="ml-5" type="">
          Filters
        </DynamicButton>
        <button
          className="border bg-sky-300 px-3 py-1 rounded-lg"
          onClick={handleOpenFilters}
        >
          Filters
        </button>
      </div>

      {isFilterOptionsOpen && <FiltersList filters={filters} />}

      <StatusColumn statusColumns={statusColumns} ticketData={ticketData} />
    </>
  );
};
