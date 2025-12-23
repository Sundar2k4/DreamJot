import React from "react";
import {
  BrowserRouter as Router,
  Route,
  useNavigate,
  Routes,
} from "react-router-dom";
import Home from "./components/home";
import DreamForm from "./components/DreamForm";
import Register from "./components/Register";
import Login from "./components/Login";
import DreamInfo from "./components/DreamInfo";
import PublicDreams from "./components/PublicDreams";
import PubInfo from "./components/PubInfo";
import Comment from "./components/Comment";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dream" element={<DreamForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dinfo" element={<DreamInfo />} />
        <Route path="/pub" element={<PublicDreams />} />
        <Route path="/pubinfo/:id" element={<PubInfo />} />
        <Route path="/comment" element={<Comment />} />
      </Routes>
    </Router>
  );
};

export default App;
