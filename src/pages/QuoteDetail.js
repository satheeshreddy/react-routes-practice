import { useParams, Outlet } from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";

import useHttp from "../hooks/use-http";
import { useEffect } from "react";
import { getSingleQuote } from "../lib/api";

const QuoteDetails = () => {
  const { id } = useParams();

  const {
    sendRequest,
    status,
    data: quote,
    erro,
  } = useHttp(getSingleQuote, true);
  useEffect(() => {
    sendRequest(id);
  }, [sendRequest, id]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="centered focused">
        <p>{erro}</p>
      </div>
    );
  }

  if (!quote.text) {
    return <div>Quote not found</div>;
  }
  return (
    <>
      <HighlightedQuote author={quote.author} text={quote.text} />
      <Outlet />
    </>
  );
};
export default QuoteDetails;
