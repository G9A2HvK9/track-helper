import { useState } from "react";
import PlaylistFetcher from "./components/PlaylistFetcher";

interface Video {
  title: string;
  formatted: { artist: string; track: string };
  url: string;
  discogs: string | null;
}

const App = () => {
  const [tracks, setTracks] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTracks = async (playlistUrl: string) => {
    setLoading(true);
    setError(null);

    console.log("Fetching playlist:", playlistUrl); // ✅ Log playlist URL

    try {
      const response = await fetch(
        `http://localhost:8000/api/youtube/playlist?playlist_url=${encodeURIComponent(playlistUrl)}`
      );

      console.log("API Response Status:", response.status); // ✅ Log HTTP status code

      if (!response.ok) {
        throw new Error(`Server returned error ${response.status}`);
      }

      const data = await response.json();
      console.log("Raw API Response:", data); // ✅ Log raw API response

      if (!data || !data.videos) {
        throw new Error("Unexpected API response format: Missing 'videos' key");
      }

      setTracks(data.videos);
    } catch (err) {
      console.error("Fetch Error:", err); // ✅ Log fetch errors
      setError("Error fetching tracks. Please check the playlist URL.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4">YouTube Playlist Fetcher</h1>
      <PlaylistFetcher onFetch={fetchTracks} />

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="mt-4 w-full max-w-2xl">
        {tracks.length > 0 ? (
          <ul className="list-disc pl-5">
            {tracks.map((track, index) => (
              <li key={index} className="mb-2">
                <a href={track.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {track.formatted.artist} - {track.formatted.track}
                </a>
                {track.discogs && (
                  <span className="ml-2 text-gray-500">
                    (<a href={track.discogs} target="_blank" rel="noopener noreferrer">Discogs</a>)
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p className="mt-4 text-gray-500">No tracks found. Enter a playlist URL to get started.</p>
        )}
      </div>
    </div>
  );
};

export default App;
