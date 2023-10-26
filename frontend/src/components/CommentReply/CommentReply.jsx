import { useMutation } from "@apollo/client";

// ICONS
import { FaRegTrashAlt } from "react-icons/fa";
// import { FiEdit2 } from "react-icons/fi";

// GRAPHQL
import { DELETE_CLIENT_ACTIVITY_COMMENT_REPLY } from "../../graphql/mutations/clientActivityCommentReplyMutations";
import { DELETE_PROJECT_ACTIVITY_COMMENT_REPLY } from "../../graphql/mutations/projectActivityCommentReplyMutations";
import { GET_CLIENT_ACTIVITY_COMMENT_REPLIES } from "../../graphql/queries/clientActivityCommentReplyQueries";
import { GET_PROJECT_ACTIVITY_COMMENT_REPLIES } from "../../graphql/queries/projectActivityCommentReplyQueries";

// STATE
import { useContext } from "react";
import { ThemeContext } from "../../context";

export const CommentReply = ({ reply, formattedDate, type, commentId }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const [deleteClientCommentReply] = useMutation(
    DELETE_CLIENT_ACTIVITY_COMMENT_REPLY,
    {
      variables: { id: reply.id },
      refetchQueries: [
        {
          query: GET_CLIENT_ACTIVITY_COMMENT_REPLIES,
          variables: { commentId },
        },
      ],
    }
  );

  const [deleteProjectCommentReply] = useMutation(
    DELETE_PROJECT_ACTIVITY_COMMENT_REPLY,
    {
      variables: { id: reply.id },
      refetchQueries: [
        {
          query: GET_PROJECT_ACTIVITY_COMMENT_REPLIES,
          variables: { commentId },
        },
      ],
    }
  );

  const handleCommentDelete = () => {
    if (type === "client") {
      deleteClientCommentReply();
    } else if (type === "project") {
      deleteProjectCommentReply();
    }
  };

  return (
    <>
      <div
        key={reply.id}
        className={`${
          darkMode ? "bg-sky-800" : "bg-slate-100"
        } border ml-10 mt-2 px-3 py-2 rounded-xl flex flex-row justify-between items-center`}
      >
        <div className="w-full flex flex-col items-start">
          <p
            className={`${
              darkMode ? "text-slate-100" : "text-slate-700"
            } text-start text-sm block w-full tracking-wide font-bold`}
          >
            {reply?.user?.name}
          </p>
          <p>{reply.commentText}</p>
        </div>
        <div className="flex justify-end">
          {/* <button className="mr-2">
            <FiEdit2 />
          </button> */}
          <button onClick={handleCommentDelete}>
            <FaRegTrashAlt className="text-red-500" />
          </button>
        </div>
      </div>
      <p
        className={`${
          darkMode ? "text-sky-100" : "text-slate-600"
        } text-start text-xs mt-2 mr-3 ml-12`}
      >
        {formattedDate}
      </p>
    </>
  );
};
