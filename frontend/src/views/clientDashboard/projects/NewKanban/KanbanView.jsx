import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { BsFillGearFill } from "react-icons/bs";

// GRAPHQL
import { GET_KANBAN } from "../../../../graphql/queries/kanbanQueries";
import { GET_KANBAN_STATUS_COLUMNS } from "../../../../graphql/queries/kanbanStatusColumnQueries";
import { ADD_KANBAN_STATUS_COLUMN } from "../../../../graphql/mutations/kanbanStatusColumnMutations";

// COMPONENTS
import { Spinner } from "react-bootstrap";
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";
import { DynamicContainer } from "../../../../components/reusable/DynamicContainer/DynamicContainer";
import { DynamicInput } from "../../../../components/reusable/DynamicInput/DynamicInput";
import { GET_TICKETS } from "../../../../graphql/queries/ticketQueries";
import { Ticket } from "../../../../components/kanban/Ticket/Ticket";
import { capitalized } from "../../../../utils/format";
import { ThemeContext } from "../../../../context";
import { FiltersList } from "../../../../components/reusable/FiltersList/FiltersList";

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

export const KanbanView = () => {
  const { kanbanId } = useParams();

  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const dispatch = useDispatch();
  const {
    size,
    description: ticketDescription,
    createdDate,
    owner,
  } = useSelector((state) => state.ticket);

  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [columnState, setColumnState] = useState("");
  const [columnDescription, setColumnDescription] = useState("");
  const [position, setPosition] = useState("");
  const [isFilterOptionsOpen, setIsFilterOptionsOpen] = useState(false);

  const { loading, error, data } = useQuery(GET_KANBAN, {
    variables: { id: kanbanId },
  });

  const {
    loading: kanbanStatusColumnLoading,
    error: kanbanStatusColumnError,
    data: kanbanStatusColumnData,
  } = useQuery(GET_KANBAN_STATUS_COLUMNS, {
    variables: { kanbanId },
  });

  const {
    loading: ticketLoading,
    error: ticketError,
    data: ticketData,
  } = useQuery(GET_TICKETS, {
    variables: { kanbanId },
  });

  const [addKanbanStatusColumn] = useMutation(ADD_KANBAN_STATUS_COLUMN, {
    variables: {
      columnState,
      columnDescription,
      kanbanId,
      position,
    },
    update(cache, { data: { addKanbanStatusColumn } }) {
      const { kanbanStatusColumns } = cache.readQuery({
        query: GET_KANBAN_STATUS_COLUMNS,
        variables: { kanbanId },
      });
      cache.writeQuery({
        query: GET_KANBAN_STATUS_COLUMNS,
        variables: { kanbanId },
        data: {
          kanbanStatusColumns: [...kanbanStatusColumns, addKanbanStatusColumn],
        },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (columnState === "" || position === "") {
      alert("Please add a state of column");
    }

    addKanbanStatusColumn(columnState, columnDescription, kanbanId, position);

    setColumnState("");
    setColumnDescription("");
    setPosition("");
  };

  const handleSizeToggle = () => {
    size ? dispatch(setSizeOff()) : dispatch(setSizeOn());
  };
  const handleDescriptionToggle = () => {
    ticketDescription
      ? dispatch(setDescriptionOff())
      : dispatch(setDescriptionOn());
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

  if (loading || kanbanStatusColumnLoading || ticketLoading) return <Spinner />;
  if (error || kanbanStatusColumnError || ticketError)
    return <p>There was a problem...</p>;

  Object.freeze(kanbanStatusColumnData.kanbanStatusColumns);

  const columnsCopy = [...kanbanStatusColumnData.kanbanStatusColumns];

  const sortedColumns = columnsCopy.sort((a, b) => a.position - b.position);

  const { title, description } = data.kanban;

  const kanbanTicketFilters = [
    {
      name: "Size",
      toggle: handleSizeToggle,
      value: size,
      isChecked: size,
      ariaLabel: "Size filter",
    },
    {
      name: "Description",
      toggle: handleDescriptionToggle,
      value: ticketDescription,
      isChecked: ticketDescription,
      ariaLabel: "Description filter",
    },
    {
      name: "Created Date",
      toggle: handleCreatedDateToggle,
      value: createdDate,
      isChecked: createdDate,
      ariaLabel: "Created Date filter",
    },
    {
      name: "Owner",
      toggle: handleOwnerToggle,
      value: owner,
      isChecked: owner,
      ariaLabel: "Owner filter",
    },
  ];

  return (
    <DynamicContainer>
      <div className="flex flex-row justify-around items-start">
        <DynamicButton
          clickHandler={() => setIsAddingColumn(!isAddingColumn)}
          type="add"
          color="red"
        >
          Add Column
        </DynamicButton>

        <DynamicButton type="link" link="addTicket" color="lightBlue">
          Add Ticket
        </DynamicButton>

        <button
          className="border bg-sky-300 px-3 py-1 rounded-lg"
          onClick={handleOpenFilters}
        >
          Filters
        </button>

        <Link to="edit">
          <BsFillGearFill />
        </Link>
      </div>

      {isAddingColumn && (
        <div>
          <form onSubmit={onSubmit}>
            <DynamicInput
              id="kanban-column-state"
              inputType="input"
              type="text"
              label="Column State"
              changeHandler={(e) => setColumnState(e.target.value)}
              placeholder="State for this column"
              value={columnState}
              ariaLabel="Kanban column state"
            />

            <DynamicInput
              id="kanban-column-description"
              inputType="textarea"
              rows="2"
              label="Kanban Column Description"
              changeHandler={(e) => setColumnDescription(e.target.value)}
              placeholder="Describe your kanban"
              value={columnDescription}
              ariaLabel="Kanban Description"
            />

            <DynamicInput
              id="kanban-column-flow-position"
              inputType="input"
              type="number"
              label="Flow State Position"
              changeHandler={(e) => setPosition(e.target.value)}
              placeholder="Position..."
              value={position}
              ariaLabel="Flow state position"
            />

            <DynamicButton color="red" type="submit">
              Submit
            </DynamicButton>

            <button
              className="border bg-sky-300 px-3 py-1 rounded-lg"
              onClick={handleOpenFilters}
            >
              Filters
            </button>
          </form>
        </div>
      )}

      {isFilterOptionsOpen && <FiltersList filters={kanbanTicketFilters} />}

      <h1 className="text-lg font-bold mt-3">{title}</h1>
      <h2 className="text-base font-normal">{description}</h2>

      <div className="flex flex-row items-start ml-2">
        {sortedColumns.map((column) => (
          <div
            key={column.id}
            className={`flex flex-col items-center ${
              darkMode
                ? "bg-sky-800 border-slate-100"
                : "bg-slate-300 border-slate-500"
            }  w-1/2 mt-2 mr-2 rounded-lg h-auto min-h-screen `}
          >
            <div className="flex flex-row items-center mt-2">
              <h5 className="font-extrabold">
                {capitalized(column.columnState)}
              </h5>
              <p className="ml-3">
                (
                {
                  ticketData.tickets.filter(
                    (ticket) => ticket.status === column.id
                  ).length
                }
                )
              </p>
            </div>
            <ul className="list-none pl-0 w-full">
              {ticketData.tickets
                .filter((ticket) => ticket.status === column.id)
                .map((ticket) => (
                  <li key={ticket.id} className="w-full">
                    <Ticket ticket={ticket} />
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </DynamicContainer>
  );
};
