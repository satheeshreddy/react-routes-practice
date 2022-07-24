import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import CommentsList from "./CommentsList";

import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { id } = useParams();

  const { sendRequest, status, data } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(id);
  }, [sendRequest, id]);

  const handleAddComment = useCallback(() => {
    sendRequest(id);
  }, [sendRequest, id]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  let comments;

  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && data && data.length > 0) {
    comments = <CommentsList comments={data} />;
  }

  if (status === "completed" && (!data || data.length === 0)) {
    comments = <div className="centered">No comments yet</div>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm onAddComment={handleAddComment} quoteId={id} />
      )}
      {comments}
    </section>
  );
};

export default Comments;
