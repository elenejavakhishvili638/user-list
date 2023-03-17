import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./pages/User";
import VisitedPage from "./pages/VisitedPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:userId" element={<User />} />
        {/* <Route path="user/:id/visited" element={<VisitedPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
