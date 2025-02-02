interface Track {
    title: string;
    url: string;
    discogs?: string | null;
  }
  
  interface TrackListProps {
    tracks: Track[];
  }
  
  const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
    return (
      <div className="mt-4 w-full max-w-3xl mx-auto">
        {tracks.length === 0 ? (
          <p className="text-gray-500 text-center">No tracks found.</p>
        ) : (
          <ul className="space-y-4">
            {tracks.map((track, index) => (
              <li key={index} className="p-4 border rounded-lg shadow-md">
                <p className="text-lg font-semibold">{track.title}</p>
                <a
                  href={track.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  YouTube Link
                </a>
                {track.discogs && (
                  <p>
                    Discogs:{" "}
                    <a
                      href={track.discogs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 underline"
                    >
                      View on Discogs
                    </a>
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default TrackList;
  