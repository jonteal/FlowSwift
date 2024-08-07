// LIBRARIES
import { useMutation } from "@apollo/client";

// GRAPHQL
import { ADD_CLIENT_ACTIVITY_COMMENT } from "../../graphql/mutations/clientActivityCommentMutations";
import { GET_CLIENT_ACTIVITY_COMMENTS } from "../../graphql/queries/clientActivityCommentQueries";

// COMPONENTS
import { Comment } from "../Comment/Comment";
import { Button } from "../../@/components/ui/button";

// STATE
import { useState } from "react";
import { useSelector } from "react-redux";

export const ClientCommentFeed = ({ clientId, comments }) => {
  const { darkMode } = useSelector((state) => state.theme);

  const [commentText, setCommentText] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [userId, setUserId] = useState(userInfo._id);

  const [addClientActivityComment] = useMutation(ADD_CLIENT_ACTIVITY_COMMENT, {
    variables: {
      commentText,
      clientId,
      userId,
    },
    update(cache, { data: { addClientActivityComment } }) {
      const { clientActivityComments } = cache.readQuery({
        query: GET_CLIENT_ACTIVITY_COMMENTS,
        variables: { clientId },
      });
      cache.writeQuery({
        query: GET_CLIENT_ACTIVITY_COMMENTS,
        variables: { clientId },
        data: {
          clientActivityComments: [
            ...clientActivityComments,
            addClientActivityComment,
          ],
        },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (commentText === "") {
      ("You must write a comment");
    }

    addClientActivityComment(commentText, clientId, userId);

    setCommentText("");
  };

  return (
    <div
      className={`rounded-xl ${
        darkMode ? "bg-sky-800" : "bg-slate-50"
      } mx-0 md:mx-2 px-3 mt-1 w-full`}
    >
      <form onSubmit={onSubmit}>
        <label
          className={`block uppercase tracking-wide ${
            darkMode ? "text-slate-50" : "text-gray-700"
          }  text-xs font-bold py-3`}
          htmlFor="grid-client-comment"
        >
          Client Activity Feed
        </label>
        <textarea
          id="grid-client-comment"
          type="text"
          aria-label="Comment input"
          placeholder="Write a comment"
          className={`border p-2 mb-2 rounded-md appearance-none block w-full ${
            darkMode
              ? "bg-sky-950 text-slate-50 border-gray-700 focus:bg-sky-950 focus:border-gray-50"
              : "bg-gray-200 text-gray-700 border-gray-200 focus:bg-white focus:border-gray-500"
          }  py-2 px-4 leading-tight focus:outline-none`}
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <div className="w-1/2 text-left mt-2">
          <Button type="submit">Submit</Button>
        </div>
      </form>

      <div className="mt-5 pb-2">
        {comments
          // .sort(function (a, b) {
          //   return new Date(b.createdAt) - new Date(a.createdAt);
          // })
          .map((comment) => (
            <Comment type="client" key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
};
