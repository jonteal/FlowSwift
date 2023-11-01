import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { GET_KANBAN } from "../../../../graphql/queries/kanbanQueries";
import {
  GET_KANBAN_STATUS_COLUMN,
  GET_KANBAN_STATUS_COLUMNS,
} from "../../../../graphql/queries/kanbanStatusColumnQueries";
import { ADD_KANBAN_STATUS_COLUMN } from "../../../../graphql/mutations/kanbanStatusColumnMutations";

// COMPONENTS
import { Spinner } from "react-bootstrap";
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";
import { DynamicContainer } from "../../../../components/reusable/DynamicContainer/DynamicContainer";
import { DynamicInput } from "../../../../components/reusable/DynamicInput/DynamicInput";
import { GET_TICKETS } from "../../../../graphql/queries/ticketQueries";
import { Ticket } from "../../../../components/kanban/Ticket/Ticket";

export const KanbanView = () => {
  const { kanbanId } = useParams();

  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [columnState, setColumnState] = useState("");
  const [columnDescription, setColumnDescription] = useState("");

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

    console.log("testing tsting tisting");

    if (columnState === "") {
      alert("Please add a state of column");
    }

    addKanbanStatusColumn(columnState, columnDescription, kanbanId);

    setColumnState("");
    setColumnDescription("");
  };

  if (loading) return <Spinner />;
  if (error) return <p>Failing to load kanban</p>;

  if (kanbanStatusColumnLoading) return <Spinner />;
  if (kanbanStatusColumnError) return <p>Failing to load columns</p>;
  if (ticketLoading) return <Spinner />;
  if (ticketError) return <p>Failing to load columns</p>;

  console.log("ticketData: ", ticketData);
  console.log("kanbanStatusColumnData: ", kanbanStatusColumnData);

  const { title, description } = data.kanban;

  return (
    <DynamicContainer>
      <div className="flex flex-row justify-around">
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

            <DynamicButton color="red" type="submit">
              Submit
            </DynamicButton>
          </form>
        </div>
      )}

      <h1 className="text-lg font-bold mt-3">{title}</h1>
      <h2 className="text-base font-normal">{description}</h2>

      <div className="border bg-slate-50 mt-2 ml-2 flex flex-row justify-around items-center">
        {kanbanStatusColumnData.kanbanStatusColumns.map((column) => (
          <div key={column.id} className="border bg-slate-100 mx-2 w-full">
            <h2 className="bold text-lg font-bold">{column.columnState}</h2>
            <div className="border">
              {ticketData.tickets
                .filter((ticket) => ticket.status === column.id)
                .map((ticket) => (
                  <li key={ticket.id} className="w-full">
                    <Ticket ticket={ticket} />
                  </li>
                ))}
            </div>
          </div>
        ))}
      </div>
    </DynamicContainer>
  );
};
