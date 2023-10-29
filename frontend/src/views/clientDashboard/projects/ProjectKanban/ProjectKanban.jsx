import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_TICKETS } from "../../../../graphql/queries/ticketQueries";

// COMPONENTS
import { StatusColumn } from "../../../../components/kanban/StatusColumn/StatusColumn";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";

// STATE
import { useDispatch, useSelector } from "react-redux";
import { setSizeOff, setSizeOn } from "../../../../slices/ticketSlice";
import { FilterToggle } from "../../../../components/reusable/FilterToggle/FilterToggle";

export const ProjectKanban = () => {
  const { projectId } = useParams();

  const [isFilterOptionsOpen, setIsFilterOptionsOpen] = useState(false);

  const dispatch = useDispatch();
  const size = useSelector((state) => state.ticket.size);

  const handleSizeToggle = () => {
    size ? dispatch(setSizeOff()) : dispatch(setSizeOn());
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
      {isFilterOptionsOpen && (
        <div className="border-slate-700 bg-slate-50 px-3 py-3 mx-2 my-2">
          <ul>
            {filters.map((filter) => (
              <li key={filter.name}>
                <div className="flex flex-row">
                  <p className="mr-3">{filter.name}</p>
                  <FilterToggle
                    value={filter.value}
                    toggleHandler={filter.toggle}
                    isChecked={filter.isChecked}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <StatusColumn statusColumns={statusColumns} ticketData={ticketData} />
    </>
  );
};
