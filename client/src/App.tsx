import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./global.css";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />} />
      </Routes>
    </div>
  );
};

export default App;
