import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../@/components/ui/form";
import { Input } from "../../../../@/components/ui/input";
import { Button } from "../../../../@/components/ui/button";

// const formSchema = z.object({
//   title: z.ZodString,
//   description: z.ZodString,
//   projectId: z.ZodString,
// });

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

  // const { handleSubmit, register, control } = useForm({
  //   defaultValues: {
  //     title: "test",
  //     description: "",
  //     projectId,
  //   },
  // });

  // console.log("title: ", title);

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
    <>
      <DynamicContainer className="mt-2">
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
      {/* <Form {...form}> */}
      {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" {...register("title")} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" {...register("description")} />
        </div>
        <div>
          <label htmlFor="projectId">Project Id</label>
          <input type="text" {...register("projectId")} />
        </div>
        <Button type="submit">Submit</Button>
      </form> */}
      {/* </Form> */}
    </>
  );
};
