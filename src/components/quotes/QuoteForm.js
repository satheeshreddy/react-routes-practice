import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import Card from "../UI/Card";
import classes from "./QuoteForm.module.css";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const QuoteForm = (props) => {
  return (
    <>
      <Card>
        <Formik
          initialValues={{
            author: "",
            text: "",
          }}
          validationSchema={Yup.object({
            author: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Author is required"),
            text: Yup.string()
              .max(140, "Must be 140 characters or less")
              .required("Text is required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            props.onAddQuote({ ...values });
            await sleep(1000); // simulate server latency
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={classes.control}>
                <MyTextInput label="Author" name="author" type="text" />
              </div>
              <div className={classes.control}>
                <MyTextArea label="Text" name="text" rows="5" />
              </div>
              <div className={classes.actions}>
                <button type="submit" className="btn" disabled={isSubmitting}>
                  {isSubmitting ? "Please wait..." : "Add Quote"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default QuoteForm;
