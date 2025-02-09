import React, { useState, useEffect, useRef } from 'react';
import '../styles/Popup.css';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLocalPathSubmit: (path: string) => void;
  onXmlFileUpload?: (file: File) => void; // Optional function for XML file upload
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, onLocalPathSubmit, onXmlFileUpload }) => {
  const [localPath, setLocalPath] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLocalSelected, setIsLocalSelected] = useState(false);
  const [isYouTubeSelected, setIsYouTubeSelected] = useState(false);
  const [isXmlUploadSelected, setIsXmlUploadSelected] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleLocalClick = () => {
    setIsLocalSelected(true);
    setIsYouTubeSelected(false);
    setIsXmlUploadSelected(false);
  };

  const handleYouTubeClick = () => {
    setIsYouTubeSelected(true);
    setIsLocalSelected(false);
    setIsXmlUploadSelected(false);
  };

  const handleXmlUploadClick = () => {
    setIsXmlUploadSelected(true);
    setIsLocalSelected(false);
    setIsYouTubeSelected(false);
  };

  const handleSubmit = () => {
    if (localPath) {
      onLocalPathSubmit(localPath);
      onClose();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (onXmlFileUpload) onXmlFileUpload(file); // Trigger the XML file upload callback
    }
  };

  return (
    <>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content" ref={popupRef}>
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
              <button
                className={`popup-btn ${isXmlUploadSelected ? 'disabled-btn' : 'xml-btn'}`}
                onClick={handleXmlUploadClick}
              >
                Upload XML
              </button>
            </div>

            {/* Local Path Input Section */}
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

            {/* XML File Upload Section */}
            {isXmlUploadSelected && (
              <div className="xml-upload-section">
                <label htmlFor="xml-file">Upload XML File:</label>
                <input
                  type="file"
                  id="xml-file"
                  accept=".xml"
                  onChange={handleFileChange}
                />
                {selectedFile && <p className="file-name">Selected file: {selectedFile.name}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
