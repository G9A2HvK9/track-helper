import React from "react";
import '../styles/GatheringPage.css';
import { FaHome } from 'react-icons/fa'; // Importing the home icon from react-icons

const GatheringPage: React.FC = () => {
  const navigateToHome = () => {
    // You can use a navigation library like react-router-dom to navigate
    window.location.href = '/'; // Direct to the landing page
  };

  return (
    <div className="gathering-container">
      <div className="gathering-content">
        <div className="home-icon" onClick={navigateToHome}>
          <FaHome size={30} />
        </div>
        <h1>Gather Your Music</h1>
        <p>Collect music from different sources and add them to your collection!</p>
        <button className="btn">Start Gathering</button>
      </div>
    </div>
  );
};

export default GatheringPage;