import React from "react";
import '../styles/TaggingPage.css';
import { FaHome } from 'react-icons/fa'; // Importing the home icon from react-icons

const TaggingPage: React.FC = () => {
  const navigateToHome = () => {
    // You can use a navigation library like react-router-dom to navigate
    window.location.href = '/'; // Direct to the landing page
  };

  return (
    <div className="tagging-container">
      <div className="tagging-content">
        <div className="home-icon" onClick={navigateToHome}>
          <FaHome size={30} />
        </div>
        <h1>Tag Your Music</h1>
        <p>Start tagging your music collection by selecting tracks and applying relevant tags!</p>
        <button className="btn">Start Tagging</button>
      </div>
    </div>
  );
};

export default TaggingPage;
