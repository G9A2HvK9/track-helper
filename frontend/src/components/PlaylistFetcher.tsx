import { useState } from "react";

interface PlaylistFetcherProps {
  onFetch: (url: string) => void;
}

const PlaylistFetcher: React.FC<PlaylistFetcherProps> = ({ onFetch }) => {
  const [playlistUrl, setPlaylistUrl] = useState("");

  const handleFetch = () => {
    if (playlistUrl.trim() !== "") {
      onFetch(playlistUrl);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <input
        type="text"
        className="border border-gray-300 p-2 rounded-md w-80"
        placeholder="Enter YouTube Playlist URL"
        value={playlistUrl}
        onChange={(e) => setPlaylistUrl(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={handleFetch}
      >
        Get Tracks
      </button>
    </div>
  );
};

export default PlaylistFetcher;
