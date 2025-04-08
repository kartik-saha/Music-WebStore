import React, { useState, useEffect } from "react";
import "./SearchPage.css";

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [songs, setSongs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);

    useEffect(() => {
        // Fetch songs from the backend
        const fetchSongs = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/songs");
                const data = await response.json();
                setSongs(data);
                setFilteredSongs(data);
            } catch (err) {
                console.error("Error fetching songs:", err);
            }
        };

        fetchSongs();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        const filtered = songs.filter(song =>
            song.title.toLowerCase().includes(value.toLowerCase()) ||
            song.artist.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredSongs(filtered);
    };

    return (
        <div className="search-page">
            <input
                type="text"
                className="search-input"
                placeholder="Search songs..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <ul className="song-list">
                {filteredSongs.map((song) => (
                    <li key={song._id} className="song-item">
                        <strong>{song.title}</strong> by {song.artist}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchPage;
