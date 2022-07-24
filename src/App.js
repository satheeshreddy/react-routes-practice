import { Route, Routes, Navigate, Link } from "react-router-dom";
import AllQuotes from "./pages/AllQuotes";
import QuoteDetail from "./pages/QuoteDetail";
import NewQuote from "./pages/NewQuote";
import Layout from "./components/layout/Layout";
import Comments from "./components/comments/Comments";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/quotes" />} />
        <Route path="/quotes/*" element={<AllQuotes />} />
        <Route path="/quotes/:id" element={<QuoteDetail />}>
          <Route
            path=""
            element={
              <div className="centered">
                <Link className="btn--flat" to="comments">
                  Load comments
                </Link>
              </div>
            }
          />
          <Route path="comments" element={<Comments />} />
        </Route>
        <Route path="/new-quote" element={<NewQuote />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
