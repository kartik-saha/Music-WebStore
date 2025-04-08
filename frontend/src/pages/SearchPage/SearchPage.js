import React, { useEffect, useState } from "react";
import "./SearchPage.css";

const SearchPage = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/songs/songs");
        const data = await response.json();
        setSongs(data);
      } catch (err) {
        console.error("Failed to fetch songs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="search-page">
      <h1>Search Results</h1>
      {loading ? (
        <p>Loading...</p>
      ) : songs.length === 0 ? (
        <p>No songs found.</p>
      ) : (
        <ul className="song-list">
          {songs.map((song) => (
            <li key={song._id} className="song-card">
              <div className="cover">
                {song.coverImage ? (
                  <img
                    src={`http://localhost:5000/api/upload/files/${song.coverImage}`}
                    alt={song.songTitle}
                  />
                ) : (
                  <div className="cover-placeholder">🎵</div>
                )}
              </div>
              <div className="info">
                <h3>{song.songTitle}</h3>
                <p>Artist: {song.songArtist}</p>
                <p>Album: {song.album}</p>
                <p>Genre: {song.genre}</p>
                <audio controls src={`http://localhost:5000/api/upload/files/${song.songFile}`} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;
