import { useState } from "react";

// LIBRARIES
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";

// GRAPHQL
import { ADD_PROJECT_ACTIVITY_COMMENT } from "../../graphql/mutations/projectActivityCommentMutations";
import { GET_PROJECT_ACTIVITY_COMMENTS } from "../../graphql/queries/projectActivityCommentQueries";

// COMPONENTS
import { DynamicButton } from "../reusable/DynamicButton/DynamicButton";
import { Comment } from "../Comment/Comment";

// STATE
import { useContext } from "react";
import { ThemeContext } from "../../context";

export const ProjectCommentFeed = ({ projectId, comments }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const [commentText, setCommentText] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [userId, setUserId] = useState(userInfo._id);

  const [addProjectActivityComment] = useMutation(
    ADD_PROJECT_ACTIVITY_COMMENT,
    {
      variables: {
        commentText,
        projectId,
        userId,
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

    addProjectActivityComment(commentText, projectId, userId);

    setCommentText("");
  };

  return (
    <div
      className={`rounded-xl ${
        darkMode ? "bg-sky-800" : "bg-slate-50"
      }  ml-2 mr-5 mt-3 px-3 pb-2 w-full`}
    >
      <form className="flex flex-col" onSubmit={onSubmit}>
        <label
          className={`block uppercase tracking-wide ${
            darkMode ? "text-slate-50" : "text-slate-700"
          }  text-xs font-bold my-3`}
          htmlFor="grid-project-comment"
        >
          Project Activity Feed
        </label>
        <textarea
          id="grid-project-comment"
          type="text"
          aria-label="Comment input"
          placeholder="Write a comment"
          className={` ${
            darkMode
              ? "bg-sky-950 text-slate-50 border-gray-700 focus:bg-sky-950 focus:border-gray-50"
              : "bg-gray-200 text-gray-700 border-gray-200 focus:bg-white focus:border-gray-500"
          } border p-2 mb-2 rounded-md appearance-none block w-full py-2 px-4 leading-tight focus:outline-none`}
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <div className="w-1/2 text-left mt-2">
          <DynamicButton color="blue" type="submit">
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
