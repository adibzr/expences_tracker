import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "./global.css";
import NavBar from "./components/NavBar/NavBar";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route
            path="income"
            element={<h1 style={{ color: "red", fontSize: "20px" }}>income</h1>}
          />
          <Route path="/tranfer" element={<h1>tranfer</h1>} />
          <Route path="/financial-report" element={<h1>financial report</h1>} />
          <Route path="/budget" element={<h1>budget</h1>} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
