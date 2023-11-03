import { useMutation, useQuery } from "@apollo/client";
import { GET_KANBAN } from "../../../../graphql/queries/kanbanQueries";
import { useParams } from "react-router-dom";
import { GET_KANBAN_STATUS_COLUMNS } from "../../../../graphql/queries/kanbanStatusColumnQueries";
import { ADD_KANBAN_STATUS_COLUMN } from "../../../../graphql/mutations/kanbanStatusColumnMutations";
import { Spinner } from "react-bootstrap";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../../context/context";
import { capitalized } from "../../../../utils/format";
import { DynamicInput } from "../../../../components/reusable/DynamicInput/DynamicInput";
import { DynamicContainer } from "../../../../components/reusable/DynamicContainer/DynamicContainer";

export const KanbanEdit = () => {
  const { kanbanId } = useParams();

  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const { loading, error, data } = useQuery(GET_KANBAN, {
    variables: { id: kanbanId },
  });

  const kanban = data?.kanban;

  const {
    loading: kanbanStatusColumnLoading,
    error: kanbanStatusColumnError,
    data: kanbanStatusColumnData,
  } = useQuery(GET_KANBAN_STATUS_COLUMNS, {
    variables: { kanbanId },
  });

  const statusColumn = kanbanStatusColumnData?.kanbanStatusColumns;

  const [title, setTitle] = useState(kanban?.title);
  const [description, setDescription] = useState(kanban?.description);
  const [columnState, setColumnState] = useState(statusColumn?.columnState);
  const [columnDescription, setColumnDescription] = useState(
    statusColumn?.columnDescription
  );
  const [position, setPosition] = useState(statusColumn?.position);

  const [isEditingKanbanTitle, setIsEditingKanbanTitle] = useState(false);

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

  if (loading || kanbanStatusColumnLoading) return <Spinner />;
  if (error || kanbanStatusColumnError) return <p>There was a problem...</p>;

  Object.freeze(kanbanStatusColumnData.kanbanStatusColumns);

  const columnsCopy = [...kanbanStatusColumnData.kanbanStatusColumns];

  const sortedColumns = columnsCopy.sort((a, b) => a.position - b.position);

  return (
    <DynamicContainer>
      <div className="flex flex-row justify-center">
        <DynamicInput
          id="kanban-title"
          inputType="input"
          type="text"
          label="Kanban Title"
          changeHandler={(e) => setTitle(e.target.value)}
          placeholder="Name of your kanban"
          value={title}
          ariaLabel="Kanban Title"
          className="w-full mx-10"
        />

        <DynamicInput
          id="kanban-description"
          inputType="textarea"
          rows="2"
          label="Kanban Description"
          changeHandler={(e) => setDescription(e.target.value)}
          placeholder="Describe your kanban"
          value={description}
          ariaLabel="Kanban Description"
          className="w-full mx-10"
        />
      </div>

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
              {isEditingKanbanTitle ? (
                <>
                  <DynamicInput
                    id="kanban-title"
                    inputType="input"
                    type="text"
                    label="Kanban Title"
                    changeHandler={(e) => setTitle(e.target.value)}
                    placeholder="Name of your kanban"
                    value={title}
                    ariaLabel="Kanban Title"
                    className="w-full mx-10"
                  />
                </>
              ) : (
                <h5
                  onClick={() => setIsEditingKanbanTitle(!isEditingKanbanTitle)}
                  className="font-extrabold border-slate-50"
                >
                  {capitalized(column.columnState)}
                </h5>
              )}
            </div>
          </div>
        ))}
      </div>
    </DynamicContainer>
  );
};
