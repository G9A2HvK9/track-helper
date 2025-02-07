import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TaggingPage from "./pages/TaggingPage";
import GatheringPage from "./pages/GatheringPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tagging" element={<TaggingPage />} />
        <Route path="/gathering" element={<GatheringPage />} />
      </Routes>
    </Router>
  );
};

export default App;