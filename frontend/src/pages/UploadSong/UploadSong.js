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
    setCoverImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!songFile || !songTitle || !songArtist) {
      setError("Please fill all the fields and select a song file.");
      return;
    }
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("songFile", songFile);
    formData.append("coverImage", coverImage);
    formData.append("songTitle", songTitle);
    formData.append("songArtist", songArtist);
    formData.append("genre", genre);
    formData.append("album", album);

    try {
      const response = await fetch("http://localhost:5000/api/upload-song", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-song-container">
      <h2 className="upload-song-header">Upload Your Song</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Cover Image</label>
          <input type="file" accept="image/*" onChange={handleCoverImageChange} />
        </div>

        <div className="form-group">
          <label>Song File</label>
          <input type="file" accept="audio/*" onChange={handleFileChange} />
        </div>

        <div className="form-group">
          <label>Song Title</label>
          <input type="text" value={songTitle} onChange={(e) => setSongTitle(e.target.value)} placeholder="Enter song title" />
        </div>

        <div className="form-group">
          <label>Collaborating Artists</label>
          <input type="text" value={songArtist} onChange={(e) => setSongArtist(e.target.value)} placeholder="Enter artist name" />
        </div>

        <div className="form-group">
          <label>Genre</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Enter genre" />
        </div>

        <div className="form-group">
          <label>Album</label>
          <input type="text" value={album} onChange={(e) => setAlbum(e.target.value)} placeholder="Enter album name" />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <button type="submit" className="upload-btn" disabled={loading}>
            {loading ? "Uploading..." : "Upload Song"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadSong;
