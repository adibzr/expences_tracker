import { Route, Routes, useParams } from "react-router-dom";
import NavBar from "./components/navigation_bar/NavBar";
import "./global.css";
import Home from "./pages/Home/Home";
import Budget from "./pages/budget/Budget";
import Expenses from "./pages/expenses/Expenses";
import Income from "./pages/income/Income";
import TransactionPage from "./pages/transactionPage/TransactionPage";
import TransactionDetail from "./pages/transactions/TransactionDetail";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="income" element={<Income />} />
          <Route path="detail" element={<TransactionDetail />} />
          <Route path="edit/:edit/:id/*" element={<Edit />} />
          <Route path="tranfer" element={<h1>tranfer</h1>} />
          <Route path="transaction" element={<TransactionPage />} />
          <Route path="budget" element={<Budget />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
      </Routes>
    </div>
  );
};

const Edit = () => {
  const params = useParams();
  if (params.edit === "expense")
    return (
      <Routes>
        <Route path="/" element={<Expenses />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    );
  if (params.edit === "income")
    return (
      <Routes>
        <Route path="/" element={<Income />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    );
};
export default App;
