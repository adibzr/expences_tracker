import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import "./global.css";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<h1>home</h1>} />
          <Route path="/income" element={<h1>income</h1>} />
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
