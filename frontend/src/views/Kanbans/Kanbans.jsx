import { useQuery } from "@apollo/client";
import { GET_ALL_KANBANS } from "../../graphql/queries/kanbanQueries";
import { Spinner } from "../../components/reusable/Spinner/Spinner";
import { KanbanPageCard } from "../../components/kanban/KanbanPageCard/KanbanPageCard";
import {
  setKanbanCardDescriptionOff,
  setKanbanCardDescriptionOn,
} from "../../slices/kanbanSlice";
import { FiltersList } from "../../components/reusable/FiltersList/FiltersList";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Kanbans = () => {
  const { loading, error, data } = useQuery(GET_ALL_KANBANS);
  const [isFilterOptionsOpen, setIsFilterOptionsOpen] = useState(false);

  const dispatch = useDispatch();

  const { cardDescription } = useSelector((state) => state.kanban);

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

  console.log("data: ", data);

  const kanbanCardFilters = [
    {
      name: "Description",
      toggle: handleKanbanCardDescriptionToggle,
      value: cardDescription,
      isChecked: cardDescription,
      ariaLabel: "Description filter",
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
      <div className="w-full">
        {isFilterOptionsOpen && <FiltersList filters={kanbanCardFilters} />}
      </div>

      <div className="flex flex-col items-center md:flex-row flex-wrap mt-3 w-full p-3">
        <div className="flex md:flex-row flex-wrap mx-auto flex-col">
          {data.allKanbans.map((kanban) => (
            <KanbanPageCard key={kanban.id} kanban={kanban} />
          ))}
        </div>
      </div>
    </div>
  );
};
