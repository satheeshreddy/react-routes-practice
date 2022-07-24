import { useEffect } from "react";
import QuoteForm from "../components/quotes/QuoteForm";
import { useHistory } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuote = () => {
  const history = useHistory();
  const { sendRequest, status } = useHttp(addQuote);
  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status, history]);
  const addQuoteHandler = (values) => {
    sendRequest(values);
  };
  return <QuoteForm onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
