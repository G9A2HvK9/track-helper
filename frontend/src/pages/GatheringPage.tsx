import '../styles/GatheringPage.css';
import Popup from '../components/Popup';
import React, { useState } from 'react';
import api from '../api/axiosInstance';

const GatheringPage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusColor, setStatusColor] = useState<string>('');
  const [musicData, setMusicData] = useState<any[]>([]);

  const handleGatheringStart = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleLocalPathSubmit = async (path: string) => {
    setIsPopupOpen(false); // Close the popup
    try {
      const response = await api.post('/api/gather', { path });

      if (response.status === 200) {
        setStatusMessage('Operation successful');
        setStatusColor('green');
        setMusicData(response.data); // Store the music data
      } else {
        setStatusMessage('Operation failed, try again');
        setStatusColor('red');
      }
    } catch (error) {
      setStatusMessage('Operation failed, try again');
      setStatusColor('red');
    }
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

      {/* Ensure status message appears below the main content */}
      <div className="status-container">
        {statusMessage && (
          <div className={`status-message ${statusColor}`}>
            <p>{statusMessage}</p>
            {statusColor === 'green' && (
              <button className="view-music-btn" onClick={() => console.log('View My Music clicked')}>
                View My Music
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GatheringPage;