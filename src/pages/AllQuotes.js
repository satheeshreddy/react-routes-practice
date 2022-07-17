import QuoteList from "../components/quotes/QuoteList";

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
const AllQuotes = () => {
  return <QuoteList quotes={DUMMY_QUOTES} />;
};

export default AllQuotes;
