// UploadSong.js

import React, { useState } from "react";
import "./UploadSong.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faEdit } from "@fortawesome/free-solid-svg-icons";

const UploadSong = () => {
  const username = localStorage.getItem("username") || "";

  const [songFile, setSongFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState(username);
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
      const response = await fetch("http://localhost:5000/api/upload/upload-song", {
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
        <div className="upload-columns">
          {/* Left Column */}
          <div className="upload-left">
            <label className="image-upload-box">
              <input type="file" accept="image/*" onChange={handleCoverImageChange} />
              {coverImage ? (
                <>
                  <img src={URL.createObjectURL(coverImage)} alt="Cover Preview" />
                  <div className="hover-icon">
                    <FontAwesomeIcon icon={faEdit} />
                  </div>
                </>
              ) : (
                <div className="upload-placeholder">
                  <FontAwesomeIcon icon={faUpload} />
                  <span>Upload Cover Image</span>
                </div>
              )}
            </label>

            <div className="form-group">
              <label className="upload-songfile">
                <input type="file" accept="audio/*" onChange={handleFileChange} />
                {songFile ? (
                  <div className="file-preview">
                    <span className="filename">{songFile.name}</span>
                    <span className="edit-icon">
                      <FontAwesomeIcon icon={faEdit} />
                    </span>
                  </div>
                ) : (
                  <span>
                    <FontAwesomeIcon icon={faUpload} /> Upload Song File
                  </span>
                )}
              </label>
            </div>
          </div>

          {/* Right Column */}
          <div className="upload-right">
            <div className="form-group">
              <label>Song Title</label>
              <input
                type="text"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                placeholder="Enter song title"
              />
            </div>

            <div className="form-group">
              <label>Artists</label>
              <input
                type="text"
                value={songArtist}
                onChange={(e) => setSongArtist(e.target.value)}
                placeholder="Enter artist name"
              />
            </div>

            <div className="form-group">
              <label>Genre</label>
              <input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Enter genre"
              />
            </div>

            <div className="form-group">
              <label>Album</label>
              <input
                type="text"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                placeholder="Enter album name"
              />
            </div>
          </div>
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
