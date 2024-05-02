import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Expenses from "./components/expenses/Expenses";
import "./global.css";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="income" element={<h1>income</h1>} />
          <Route path="tranfer" element={<h1>tranfer</h1>} />
          <Route path="financial-report" element={<h1>financial report</h1>} />
          <Route path="budget" element={<h1>budget</h1>} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
