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

    console.log("columnState: ", columnState);
    console.log("columnDescription: ", columnDescription);
    console.log("kanbanId: ", kanbanId);

    setColumnState("");
    setColumnDescription("");
  };

  // console.log("data: ", data);

  if (loading) return <Spinner />;
  if (error) return <p>Failing to load kanban</p>;

  if (kanbanStatusColumnLoading) return <Spinner />;
  if (kanbanStatusColumnError) return <p>Failing to load columns</p>;

  const { title, description } = data.kanban;

  console.log("kanbanStatusColumnData: ", kanbanStatusColumnData);

  return (
    <DynamicContainer>
      <DynamicButton
        clickHandler={() => setIsAddingColumn(!isAddingColumn)}
        type="add"
        color="red"
      >
        Add Column
      </DynamicButton>

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

      <div className="border bg-slate-50 mt-2 ml-2">
        {kanbanStatusColumnData.kanbanStatusColumns.map((column) => (
          <div>{column.columnState}</div>
        ))}
      </div>
    </DynamicContainer>
  );
};
