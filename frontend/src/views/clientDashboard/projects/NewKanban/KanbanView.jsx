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
  const [description, setDescription] = useState("");

  const { loading, error, data } = useQuery(GET_KANBAN, {
    variables: { id: kanbanId },
  });

  const [addKanbanStatusColumn] = useMutation(ADD_KANBAN_STATUS_COLUMN, {
    variables: {
      columnState,
      description,
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

    if (columnState === "") {
      alert("Please add a state of column");
    }

    addKanbanStatusColumn(columnState, description, kanbanId);

    console.log("columnState: ", columnState);
    console.log("description: ", description);
    console.log("kanbanId: ", kanbanId);

    setColumnState("");
    setDescription("");
  };

  console.log("data: ", data);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  const { title, description: kanbanDescription } = data.kanban;

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
              changeHandler={(e) => setDescription(e.target.value)}
              placeholder="Describe your kanban"
              value={description}
              ariaLabel="Kanban Description"
            />

            <DynamicButton color="red" type="submit">
              Submit
            </DynamicButton>
          </form>
        </div>
      )}

      <h1 className="text-lg font-bold mt-3">{title}</h1>
      <h2 className="text-base font-normal">{kanbanDescription}</h2>
    </DynamicContainer>
  );
};
