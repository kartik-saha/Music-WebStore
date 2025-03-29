import React, { useState } from "react";
import "./UploadSong.css";

const UploadSong = () => {
  const [songFile, setSongFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [album, setAlbum] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setSongFile(event.target.files[0]);
  };

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  const handleCoverImageClick = () => {
    document.getElementById("cover-image-input").click(); // Trigger file input when the cover image is clicked
  };

  const handleSongFileClick = () => {
    document.getElementById("song-file-input").click(); // Trigger song file input when the button is clicked
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!songFile || !songTitle || !songArtist) {
      setError("Please fill all the fields and select a song file.");
      return;
    }

    setLoading(true);
    setError("");

    // Mock API request to simulate uploading
    setTimeout(() => {
      setLoading(false);
      alert("Song uploaded successfully!");
    }, 2000);
  };

  return (
    <div className="upload-song-container">
      <h2 className="upload-song-header">Upload Your Song</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        {/* Left Column: Cover Image and File Upload */}
        <div className="left-column">
          <div className="cover-image-container" onClick={handleCoverImageClick}>
            {coverImage ? (
              <img src={coverImage} alt="Cover" className="cover-image-preview" />
            ) : (
              <div className="cover-image-placeholder">Cover Image</div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            id="cover-image-input"
            className="file-input"
            style={{ display: "none" }} // Hide the file input
          />
          <div className="form-group">
            <button
              type="button"
              className="upload-button"
              onClick={handleSongFileClick}
            >
              {songFile ? songFile.name : "Select Song File"}
            </button>
            <input
              type="file"
              id="song-file-input"
              onChange={handleFileChange}
              accept=".mp3, .wav, .flac"
              className="file-input"
              style={{ display: "none" }} // Hide the file input
            />
          </div>
        </div>

        {/* Right Column: Song Details */}
        <div className="right-column">
          <div className="form-group">
            <label htmlFor="song-title">Song Title</label>
            <input
              type="text"
              id="song-title"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              placeholder="Enter song title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="song-artist">Collaborating Artists</label>
            <input
              type="text"
              id="song-artist"
              value={songArtist}
              onChange={(e) => setSongArtist(e.target.value)}
              placeholder="Enter artist name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="song-genre">Genre</label>
            <input
              type="text"
              id="song-genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Enter genre"
            />
          </div>

          <div className="form-group">
            <label htmlFor="album">Album</label>
            <input
              type="text"
              id="album"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              placeholder="Enter album name"
            />
          </div>

          {error && <div className="error-message">{error}</div>}
        </div>
      </form>
          <div className="form-group">
            <button type="submit" className="upload-btn" disabled={loading}>
              {loading ? "Uploading..." : "Upload Song"}
            </button>
          </div>
    </div>
  );
};

export default UploadSong;
