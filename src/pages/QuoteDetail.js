import { Route, useParams } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";

const DUMMY_QUOTES = [
  {
    id: 1,
    text: "I'm not a great programmer; I'm just a good programmer with great habits.",
    author: "Kent Beck",
  },
  {
    id: 2,
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
];
const QuoteDetails = () => {
  const { id } = useParams();
  const quote = DUMMY_QUOTES.find((quote) => quote.id === +id);
  if (!quote) {
    return <div>Quote not found</div>;
  }
  return (
    <>
      <HighlightedQuote author={quote.author} text={quote.text} />
      <Route path="/quotes/:id/comments">
        <Comments />
      </Route>
    </>
  );
};
export default QuoteDetails;
