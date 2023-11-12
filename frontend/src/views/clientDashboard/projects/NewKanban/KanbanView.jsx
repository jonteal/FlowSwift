import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

// ICONS
// import { BsFillGearFill } from "react-icons/bs";
// import { FaEdit } from "react-icons/fa";
import { PiArrowsOutLineHorizontalBold } from "react-icons/pi";
import { BiArrowToBottom, BiArrowToTop } from "react-icons/bi";

// GRAPHQL
import { GET_KANBAN } from "../../../../graphql/queries/kanbanQueries";
import { GET_KANBAN_STATUS_COLUMNS } from "../../../../graphql/queries/kanbanStatusColumnQueries";
import { ADD_KANBAN_STATUS_COLUMN } from "../../../../graphql/mutations/kanbanStatusColumnMutations";
import { GET_TICKETS } from "../../../../graphql/queries/ticketQueries";

// COMPONENTS
import { Spinner } from "react-bootstrap";
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";
import { DynamicContainer } from "../../../../components/reusable/DynamicContainer/DynamicContainer";
import { DynamicInput } from "../../../../components/reusable/DynamicInput/DynamicInput";
import { Ticket } from "../../../../components/kanban/Ticket/Ticket";
import { FiltersList } from "../../../../components/reusable/FiltersList/FiltersList";
import { DeleteColumn } from "./DeleteColumn";

// STATE
import { ThemeContext } from "../../../../context";
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

// UTILS
import { capitalized } from "../../../../utils/format";
import { Body } from "../../../../components/reusable/Body/Body";
import { SectionHeadline } from "../../../../components/reusable/SectionHeadline/SectionHeadline";

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
  const [collapseColumn, setCollapseColumn] = useState(false);
  const [isColumnHorizontallyCollapsed, setIsColumnHorizontallyCollapsed] =
    useState(false);

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

  const handleCollapseColumn = () => {
    setCollapseColumn(!collapseColumn);
  };

  if (loading || kanbanStatusColumnLoading || ticketLoading) return <Spinner />;
  if (error || kanbanStatusColumnError || ticketError)
    return <p>There was a problem...</p>;

  const hasStatusColumn = kanbanStatusColumnData.kanbanStatusColumns.length > 0;

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

  // const handleColumnHorizontalCollapse = () => {
  //   setIsColumnHorizontallyCollapsed(!isColumnHorizontallyCollapsed);
  // };

  return (
    <DynamicContainer className="h-screen">
      <div className="flex flex-row justify-around items-start">
        <DynamicButton
          clickHandler={() => setIsAddingColumn(!isAddingColumn)}
          type="add"
          color="red"
        >
          Add Column
        </DynamicButton>

        {hasStatusColumn && (
          <DynamicButton type="link" link="addTicket" color="lightBlue">
            Add Ticket
          </DynamicButton>
        )}

        <button
          className="border bg-sky-300 px-3 py-1 rounded-lg"
          onClick={handleOpenFilters}
        >
          Filters
        </button>

        {/* <Link to="edit">
          <BsFillGearFill />
        </Link> */}
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

      <SectionHeadline>{title}</SectionHeadline>
      <Body>{description}</Body>

      {!hasStatusColumn && (
        <p className="italic mt-5 border bg-green-300 rounded-xl w-3/4 mx-auto">
          Add a flow state column prior to adding stories
        </p>
      )}

      <div className="flex flex-col md:flex-row h-auto md:h-screen items-start ml-2">
        {sortedColumns.map((column) => (
          <div className="flex flex-row w-full">
            {/* <PiArrowsOutLineHorizontalBold
              onClick={handleColumnHorizontalCollapse}
              className="text-slate-900 text-lg"
            /> */}
            <div
              key={column.id}
              className={`flex flex-col items-center ${
                darkMode
                  ? "bg-sky-900 border-slate-100"
                  : "bg-slate-300 border-slate-500"
              } w-full mt-2 mr-2 rounded-lg ${
                collapseColumn ? "h-10" : "h-auto"
              } md:min-h-screen ${isColumnHorizontallyCollapsed ? "w-0" : ""}`}
            >
              <div className="flex flex-col mt-2 w-full">
                <div className="w-full border-red-50 flex flex-row items-center justify-between">
                  <div className="w-full flex flex-row items-start">
                    <BiArrowToBottom
                      onClick={handleCollapseColumn}
                      className={`text-2xl top-0 cursor-pointer ${
                        collapseColumn
                          ? "rotate-180 transform transition ease-in-out delay-50 duration-200"
                          : ""
                      } `}
                    />
                    {/* <FaEdit className="self-start text-lg w-full cursor-pointer" /> */}
                  </div>
                  <div className="flex flex-row items-center w-full">
                    <h5 className="font-extrabold w-full">
                      {capitalized(column.columnState)}
                    </h5>
                    <p className="ml-2">
                      (
                      {
                        ticketData.tickets.filter(
                          (ticket) => ticket.status === column.id
                        ).length
                      }
                      )
                    </p>
                  </div>
                  <DeleteColumn
                    subject="Status Column"
                    columnId={column.id}
                    kanbanId={kanbanId}
                  />
                </div>
              </div>

              <ul
                className={`${
                  collapseColumn ? "hidden" : ""
                } list-none pl-0 w-full`}
              >
                {ticketData.tickets
                  .filter((ticket) => ticket.status === column.id)
                  .map((ticket) => (
                    <li key={ticket.id} className="w-full">
                      <Ticket ticket={ticket} />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </DynamicContainer>
  );
};
