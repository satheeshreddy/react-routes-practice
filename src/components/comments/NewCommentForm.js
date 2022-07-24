// import { useRef } from 'react';

// import classes from './NewCommentForm.module.css';

// const NewCommentForm = (props) => {
//   const commentTextRef = useRef();

//   const submitFormHandler = (event) => {
//     event.preventDefault();

//     // optional: Could validate here

//     // send comment to server
//   };

//   return (
//     <form className={classes.form} onSubmit={submitFormHandler}>
//       <div className={classes.control} onSubmit={submitFormHandler}>
//         <label htmlFor='comment'>Your Comment</label>
//         <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
//       </div>
//       <div className={classes.actions}>
//         <button className='btn'>Add Comment</button>
//       </div>
//     </form>
//   );
// };

// export default NewCommentForm;

import React, { useEffect } from "react";
import { Formik, Form, useField, yupToFormErrors } from "formik";
import * as Yup from "yup";

import classes from "./NewCommentForm.module.css";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";

const TextAreaInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea {...field} {...props} />

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const NewCommentForm = (props) => {
  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddComment();
    }
  }, [status, error, onAddComment]);

  return (
    <Formik
      initialValues={{ comment: "" }}
      validationSchema={Yup.object({
        comment: Yup.string()
          .max(255, "Comment is too long")
          .required("Comment is required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        sendRequest({
          commentData: { text: values.comment },
          quoteId: props.quoteId,
        });
        await sleep(1000); // simulate server latency
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={classes.form}>
          <div className={classes.control}>
            <TextAreaInput label="Your Comment" name="comment" rows="5" />
          </div>
          <div className={classes.actions}>
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Please wait..." : "Add Quote"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewCommentForm;
