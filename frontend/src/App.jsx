import React from "react";
import {
  BrowserRouter as Router,
  Route,
  useNavigate,
  Routes,
} from "react-router-dom";
import Home from "./components/home";
import DreamForm from "./components/DreamForm";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dream" element={<DreamForm />} />
      </Routes>
    </Router>
  );
};

export default App;
