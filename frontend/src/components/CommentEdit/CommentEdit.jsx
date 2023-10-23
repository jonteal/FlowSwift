import { useState } from "react";
import { useMutation } from "@apollo/client";

// GRAPHQL
import { UPDATE_PROJECT_ACTIVITY_COMMENT } from "../../graphql/mutations/projectActivityCommentMutations";
import { GET_PROJECT_ACTIVITY_COMMENTS } from "../../graphql/queries/projectActivityCommentQueries";

import { DynamicButton } from "../reusable/DynamicButton/DynamicButton";

export const CommentEdit = ({ id, comment, projectId, setIsEditing }) => {
  const [commentText, setCommentText] = useState(comment);

  const [updateProjectActivityComment] = useMutation(
    UPDATE_PROJECT_ACTIVITY_COMMENT,
    {
      variables: {
        id,
        commentText,
        projectId,
      },
      update(cache, { data: { updateProjectActivityComment } }) {
        const { projectActivityComments } = cache.readQuery({
          query: GET_PROJECT_ACTIVITY_COMMENTS,
        });
        cache.writeQuery({
          query: GET_PROJECT_ACTIVITY_COMMENTS,
          data: {
            projectActivityComments: [
              ...projectActivityComments,
              updateProjectActivityComment,
            ],
          },
        });
      },
    }
  );

  const onSubmit = (e) => {
    e.preventDefault();

    if (commentText === "") {
      alert("You must write a comment");
    }

    updateProjectActivityComment(commentText, projectId);
    () => setIsEditing(false);
  };
  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <textarea
        id="grid-project-comment"
        type="text"
        aria-label="Comment input"
        placeholder="Write a comment"
        className="border p-2 mb-2 rounded-md appearance-none block w-full bg-gray-200 text-gray-700 border-gray-200 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        rows={3}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <div className="w-1/2 text-left mt-2">
        <DynamicButton type="submit">Save</DynamicButton>
      </div>
    </form>
  );
};
