import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'; // Import CSS file

const LandingPage: React.FC = () => {
  return (
    <div className="landing-container">
      <div className="functionality-container">
        <div className="functionality-card">
          <h2>Gathering</h2>
          <p>Collect your music</p>
          <Link to="/gathering" className="btn">Start Gathering</Link>
        </div>
        <div className="functionality-card">
          <h2>Tagging</h2>
          <p>Tag your music</p>
          <Link to="/tagging" className="btn">Start Tagging</Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
