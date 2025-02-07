import '../styles/GatheringPage.css';
import Popup from '../components/popup';
import React, { useState } from 'react';


const GatheringPage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [localFolderPath, setLocalFolderPath] = useState('');

  const handleGatheringStart = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleLocalPathSubmit = (path: string) => {
    // Process the local path here, like storing it in state or calling an API to gather the music
    setLocalFolderPath(path);
    console.log('Gathering from path:', path); // For now, just log it
  };

  return (
    <div className="gathering-container">
      <div className="gathering-content">
        <h1>Gather Your Music</h1>
        <p>Collect music from different sources and add them to your collection!</p>
        <button className="btn" onClick={handleGatheringStart}>
          Start Gathering
        </button>
      </div>

      {/* Popup for Local and YouTube selection */}
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onLocalPathSubmit={handleLocalPathSubmit}
      />
    </div>
  );
};

export default GatheringPage;