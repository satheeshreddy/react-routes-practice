import React from "react";
import { ReactDOM } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { Prompt } from "react-router-dom";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
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

const QuoteForm = (props) => {
  const [isEntering, setEntering] = React.useState(false);
  const formFocusHandler = () => {
    console.log("Form focused");
    setEntering(true);
  };
  const isEnteringHadler = () => {
    console.log("Form blurred");
    setEntering(false);
  };
  return (
    <>
      <Prompt
        when={isEntering}
        message={(location) => "Are you sure you want to leave?"}
      />
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
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            props.onAddQuote({ ...values });

            setSubmitting(false);
          }}
        >
          {({ isSubmitting, touched }) => (
            <Form>
              {props.isLoading && (
                <div className={classes.loading}>
                  <LoadingSpinner />
                </div>
              )}
              {(touched.author || touched.text) && formFocusHandler()}
              {isSubmitting && isEnteringHadler()}
              <div className={classes.control}>
                <MyTextInput label="Author" name="author" type="text" />
              </div>
              <div className={classes.control}>
                <MyTextArea label="Text" name="text" rows="5" />
              </div>
              <div className={classes.actions}>
                <button type="submit" className="btn" disabled={isSubmitting}>
                  Add Quote
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
