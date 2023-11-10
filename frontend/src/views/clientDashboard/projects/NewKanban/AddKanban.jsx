import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";

// GRAPHQL
import { ADD_KANBAN } from "../../../../graphql/mutations/kanbanMutations";
import { GET_KANBANS } from "../../../../graphql/queries/kanbanQueries";

// COMPONENTS
import { DynamicInput } from "../../../../components/reusable/DynamicInput/DynamicInput";
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";
import { DynamicContainer } from "../../../../components/reusable/DynamicContainer/DynamicContainer";

export const AddKanban = () => {
  const { projectId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [addKanban] = useMutation(ADD_KANBAN, {
    variables: {
      title,
      description,
      projectId,
    },
    update(cache, { data: { addKanban } }) {
      const { kanbans } = cache.readQuery({
        query: GET_KANBANS,
        variables: { projectId },
      });
      cache.writeQuery({
        query: GET_KANBANS,
        variables: { projectId },
        data: { kanbans: [...kanbans, addKanban] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === "") {
      alert("Please add a title");
    }

    addKanban(title, description, projectId);

    setTitle("");
    setDescription("");
  };

  return (
    <DynamicContainer>
      <form onSubmit={onSubmit}>
        <DynamicInput
          id="kanban-title"
          inputType="input"
          type="text"
          label="Kanban Title"
          changeHandler={(e) => setTitle(e.target.value)}
          placeholder="Name of your kanban"
          value={title}
          ariaLabel="Kanban Title"
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
        />

        <DynamicButton color="red" type="submit">
          Submit
        </DynamicButton>
      </form>
    </DynamicContainer>
  );
};
