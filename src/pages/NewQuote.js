import { useEffect } from "react";
import QuoteForm from "../components/quotes/QuoteForm";
import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuote = () => {
  const navigate = useNavigate();
  const { sendRequest, status } = useHttp(addQuote);
  useEffect(() => {
    if (status === "completed") {
      navigate("/quotes");
    }
  }, [status, navigate]);
  const addQuoteHandler = (values) => {
    sendRequest(values);
  };
  return <QuoteForm onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
