import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

// ICONS
import { FaRegTrashAlt } from "react-icons/fa";

// GRAPHQL
import { ADD_CLIENT_ACTIVITY_COMMENT_REPLY } from "../../graphql/mutations/clientActivityCommentReplyMutations";
import { GET_CLIENT_ACTIVITY_COMMENT_REPLIES } from "../../graphql/queries/clientActivityCommentReplyQueries";
import { GET_CLIENT_ACTIVITY_COMMENTS } from "../../graphql/queries/clientActivityCommentQueries";
import { GET_PROJECT_ACTIVITY_COMMENTS } from "../../graphql/queries/projectActivityCommentQueries";
import { ADD_PROJECT_ACTIVITY_COMMENT_REPLY } from "../../graphql/mutations/projectActivityCommentReplyMutations";
import { GET_PROJECT_ACTIVITY_COMMENT_REPLIES } from "../../graphql/queries/projectActivityCommentReplyQueries";
import { DELETE_PROJECT_ACTIVITY_COMMENT } from "../../graphql/mutations/projectActivityCommentMutations";
import { DELETE_CLIENT_ACTIVITY_COMMENT } from "../../graphql/mutations/clientActivityCommentMutations";

// COMPONENTS
import { CommentReply } from "../CommentReply/CommentReply";
import { Spinner } from "../reusable/Spinner/Spinner";
import { DynamicButton } from "../reusable/DynamicButton/DynamicButton";

// STATE
import { useContext } from "react";
import { ThemeContext } from "../../context";

export const Comment = ({ comment, type }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const { clientId, projectId } = useParams();

  const [addReply, setAddReply] = useState(false);
  const [commentText, setCommentText] = useState("");

  const formattedDate = new Date(parseInt(comment.createdAt)).toDateString();

  const commentId = comment.id;

  const [addClientActivityCommentReply] = useMutation(
    ADD_CLIENT_ACTIVITY_COMMENT_REPLY,
    {
      variables: {
        commentText,
        commentId,
      },
      update(cache, { data: { addClientActivityCommentReply } }) {
        const { clientActivityCommentReplies } = cache.readQuery({
          query: GET_CLIENT_ACTIVITY_COMMENT_REPLIES,
          variables: { commentId },
        });
        cache.writeQuery({
          query: GET_CLIENT_ACTIVITY_COMMENT_REPLIES,
          variables: { commentId },
          data: {
            clientActivityCommentReplies: [
              ...clientActivityCommentReplies,
              addClientActivityCommentReply,
            ],
          },
        });
      },
    }
  );

  const [addProjectActivityCommentReply] = useMutation(
    ADD_PROJECT_ACTIVITY_COMMENT_REPLY,
    {
      variables: {
        commentText,
        commentId,
      },
      update(cache, { data: { addProjectActivityCommentReply } }) {
        const { projectActivityCommentReplies } = cache.readQuery({
          query: GET_PROJECT_ACTIVITY_COMMENT_REPLIES,
          variables: { commentId },
        });
        cache.writeQuery({
          query: GET_PROJECT_ACTIVITY_COMMENT_REPLIES,
          variables: { commentId },
          data: {
            projectActivityCommentReplies: [
              ...projectActivityCommentReplies,
              addProjectActivityCommentReply,
            ],
          },
        });
      },
    }
  );

  const {
    loading: clientActivityCommentRepliesLoading,
    error: clientActivityCommentRepliesError,
    data: clientActivityCommentRepliesData,
  } = useQuery(GET_CLIENT_ACTIVITY_COMMENT_REPLIES, {
    variables: { commentId },
  });

  const {
    loading: projectActivityCommentRepliesLoading,
    error: projectActivityCommentRepliesError,
    data: projectActivityCommentRepliesData,
  } = useQuery(GET_PROJECT_ACTIVITY_COMMENT_REPLIES, {
    variables: { commentId },
  });

  const [deleteClientComment] = useMutation(DELETE_CLIENT_ACTIVITY_COMMENT, {
    variables: { id: commentId },
    refetchQueries: [
      { query: GET_CLIENT_ACTIVITY_COMMENTS, variables: { clientId } },
    ],
  });

  const [deleteProjectComment] = useMutation(DELETE_PROJECT_ACTIVITY_COMMENT, {
    variables: { id: commentId },
    refetchQueries: [
      { query: GET_PROJECT_ACTIVITY_COMMENTS, variables: { projectId } },
    ],
  });

  const handleCommentDelete = () => {
    if (type === "client") {
      deleteClientComment();
    } else if (type === "project") {
      deleteProjectComment();
    }
  };

  if (
    clientActivityCommentRepliesLoading ||
    projectActivityCommentRepliesLoading
  )
    return <Spinner />;
  if (clientActivityCommentRepliesError || projectActivityCommentRepliesError)
    return <p>There was an error loading the comment feed</p>;

  const clientCommentReplies =
    clientActivityCommentRepliesData.clientActivityCommentReplies;

  const projectCommentReplies =
    projectActivityCommentRepliesData.projectActivityCommentReplies;

  const onSubmit = (e) => {
    e.preventDefault();

    if (commentText === "") {
      alert("You must write a reply");
    }

    if (type === "client") {
      addClientActivityCommentReply(commentText, comment.id);
    } else if (type === "project") {
      addProjectActivityCommentReply(commentText, comment.id);
    }

    setCommentText("");
    setAddReply(false);
  };

  return (
    <div
      className={`my-4 ${
        darkMode ? "bg-sky-950" : "bg-slate-200"
      }  p-2 rounded-xl`}
    >
      <>
        <div
          className={`border px-3 py-2 ${
            darkMode ? "bg-sky-700" : "bg-slate-100"
          }  rounded-xl flex flex-row justify-between items-center`}
          key={comment.id}
        >
          <div className="flex flex-col items-start">
            <p
              className={`${
                darkMode ? "text-slate-100" : "text-slate-700"
              } text-start text-sm block w-full tracking-wide font-bold`}
            >
              {comment?.user?.name}
            </p>
            <p
              className={`${
                darkMode ? "text-slate-100" : "text-slate-700"
              } text-start mt-3 w-full`}
            >
              {comment.commentText}
            </p>
          </div>

          <div className="flex justify-end">
            <button onClick={handleCommentDelete}>
              <FaRegTrashAlt className="text-red-500" />
            </button>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <p
            className={`${
              darkMode ? "text-sky-100" : "text-slate-600"
            } text-start text-xs mt-2 ml-2 mr-3`}
          >
            {formattedDate}
          </p>
          <button
            className={`text-sm mt-2 ${
              darkMode ? "text-sky-100" : "text-slate-600"
            } `}
            onClick={() => setAddReply(!addReply)}
          >
            {addReply ? "Close" : "Reply"}
          </button>
        </div>
      </>

      {addReply && (
        <>
          <form onSubmit={onSubmit}>
            <label
              className={`block uppercase tracking-wide ${
                darkMode ? "text-sky-100" : "text-gray-700"
              }  text-xs font-bold py-3`}
              htmlFor="grid-client-comment"
            >
              Add Reply
            </label>
            <textarea
              id="grid-client-comment"
              type="text"
              aria-label="Comment input"
              placeholder="Write a comment"
              className="border p-2 mb-2 rounded-md appearance-none block w-full bg-slate-50 text-slate-700 border-gray-200 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <DynamicButton
              color="red"
              type="submit"
              className="w-1/2 text-left mt-2"
            >
              Save
            </DynamicButton>
          </form>
        </>
      )}

      {type === "client"
        ? clientCommentReplies.map((reply) => (
            <CommentReply
              key={reply.id}
              commentId={commentId}
              formattedDate={formattedDate}
              reply={reply}
              type="client"
            />
          ))
        : projectCommentReplies.map((reply) => (
            <CommentReply
              key={reply.id}
              commentId={commentId}
              formattedDate={formattedDate}
              reply={reply}
              type="project"
            />
          ))}
    </div>
  );
};
