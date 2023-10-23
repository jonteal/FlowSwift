import { useState } from "react";

// LIBRARIES
import { useMutation } from "@apollo/client";

// GRAPHQL
import { ADD_PROJECT_ACTIVITY_COMMENT } from "../../graphql/mutations/projectActivityCommentMutations";
import { GET_PROJECT_ACTIVITY_COMMENTS } from "../../graphql/queries/projectActivityCommentQueries";

// COMPONENTS
import { DynamicButton } from "../reusable/DynamicButton/DynamicButton";
import { Comment } from "../Comment/Comment";

export const ProjectCommentFeed = ({ projectId, comments }) => {
  const [commentText, setCommentText] = useState("");

  const [addProjectActivityComment] = useMutation(
    ADD_PROJECT_ACTIVITY_COMMENT,
    {
      variables: {
        commentText,
        projectId,
      },
      update(cache, { data: { addProjectActivityComment } }) {
        const { projectActivityComments } = cache.readQuery({
          query: GET_PROJECT_ACTIVITY_COMMENTS,
          variables: { projectId },
        });
        cache.writeQuery({
          query: GET_PROJECT_ACTIVITY_COMMENTS,
          variables: { projectId },
          data: {
            projectActivityComments: [
              ...projectActivityComments,
              addProjectActivityComment,
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

    addProjectActivityComment(commentText, projectId);

    setCommentText("");
  };

  return (
    <div className="rounded-xl bg-slate-50 ml-2 mr-5 mt-3 px-3 pb-2 w-full">
      <form className="flex flex-col" onSubmit={onSubmit}>
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3"
          htmlFor="grid-project-comment"
        >
          Project Activity Feed
        </label>
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
          <DynamicButton color="red" type="submit">
            Save
          </DynamicButton>
        </div>
      </form>

      <div className="mt-5">
        {comments
          // .sort(function (a, b) {
          //   return new Date(a.createdAt) - new Date(b.createdAt);
          // })
          .map((comment) => (
            <Comment type="project" key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
};
