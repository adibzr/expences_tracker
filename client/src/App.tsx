import { Route, Routes, useParams } from "react-router-dom";
import Home from "./components/Home/Home";
import Expenses from "./components/expenses/Expenses";
import Income from "./components/income/Income";
import NavBar from "./components/navigation_bar/NavBar";
import Budget from "./pages/budget/Budget";
import TransactionDetail from "./components/transactions/TransactionDetail";
import TransactionPage from "./pages/transactionPage/TransactionPage";
import "./global.css";

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
