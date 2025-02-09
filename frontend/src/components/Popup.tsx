import React, { useState, useEffect, useRef } from 'react';
import '../styles/Popup.css';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLocalPathSubmit: (path: string) => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, onLocalPathSubmit }) => {
  const [localPath, setLocalPath] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLocalSelected, setIsLocalSelected] = useState(false);
  const [isYouTubeSelected, setIsYouTubeSelected] = useState(false);
  const [isXmlUploadSelected, setIsXmlUploadSelected] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowConfirmation(true); // Show confirmation prompt
    }
  };

  const handleConfirmUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch('http://localhost:8000/api/xml/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          alert('File uploaded and processed successfully');
        } else {
          alert('Error uploading file');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error occurred while uploading the file');
      } finally {
        setShowConfirmation(false);
        setSelectedFile(null);
      }
    }
  };

  const handleSubmit = () => {
    if (localPath) {
      onLocalPathSubmit(localPath);
      onClose();
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

            {isXmlUploadSelected && (
              <div className="xml-upload-section">
                <label htmlFor="xml-file">Upload XML File:</label>
                <input type="file" id="xml-file" accept=".xml" onChange={handleFileChange} />
                {selectedFile && <p className="file-name">Selected file: {selectedFile.name}</p>}
              </div>
            )}

            {showConfirmation && (
              <div className="confirmation-popup">
                <p>Do you want to upload {selectedFile?.name}?</p>
                <button onClick={handleConfirmUpload}>Confirm</button>
                <button onClick={() => setShowConfirmation(false)}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
