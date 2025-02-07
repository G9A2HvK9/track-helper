import React, { useState, useEffect, useRef } from 'react'; // Add useEffect and useRef
import '../styles/Popup.css'; // Import CSS from ../styles/

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLocalPathSubmit: (path: string) => void; // The function passed from Gathering
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, onLocalPathSubmit }) => {
  const [localPath, setLocalPath] = useState('');
  const [isLocalSelected, setIsLocalSelected] = useState(false); // State to track if Local is selected
  const [isYouTubeSelected, setIsYouTubeSelected] = useState(false); // State for YouTube

  const popupRef = useRef<HTMLDivElement>(null); // Create a ref for the popup

  useEffect(() => {
    // Close the popup if the user clicks outside of it
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose(); // Close the popup
      }
    };

    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]); // Dependency array includes onClose to avoid stale closures

  const handleLocalClick = () => {
    setIsLocalSelected(true);
    setIsYouTubeSelected(false); // Reset YouTube button state when Local is selected
  };

  const handleYouTubeClick = () => {
    setIsYouTubeSelected(true);
    setIsLocalSelected(false); // Reset Local button state when YouTube is selected
  };

  const handleSubmit = () => {
    if (localPath) {
      onLocalPathSubmit(localPath);
      onClose(); // Close the popup after submission
    }
  };

  return (
    <>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content" ref={popupRef}> {/* Add ref to the popup container */}
            <button className="close-btn" onClick={onClose}>X</button>
            <h3>Select Gathering Option</h3>
            <div className="button-group">
              <button
                className={`popup-btn ${isLocalSelected ? 'disabled-btn' : 'youtube-btn'}`}
                onClick={handleYouTubeClick}
              >
                YouTube
              </button>
              <button
                className={`popup-btn ${isYouTubeSelected ? 'disabled-btn' : 'local-btn'}`}
                onClick={handleLocalClick}
              >
                Local
              </button>
            </div>

            {/* Conditionally render the local path input and submit button */}
            {isLocalSelected && (
              <div className="local-input-section">
                <label htmlFor="local-path">Enter Local Music Folder Path:</label>
                <input
                  type="text"
                  id="local-path"
                  value={localPath}
                  onChange={(e) => setLocalPath(e.target.value)}
                  placeholder="e.g., /Users/music"
                />
                <button onClick={handleSubmit} className="submit-btn">Submit</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
