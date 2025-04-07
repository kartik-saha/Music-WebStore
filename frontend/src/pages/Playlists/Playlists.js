import React, { useState } from "react";
import "./Playlists.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Playlists = () => {
    const [playlists, setPlaylists] = useState([
        { 
            id: 1, 
            name: "Chill Vibes", 
            songs: 3, 
            duration: "12 min", 
            songList: [
                { title: "Song A", artist: "Artist 1", album: "Album X", duration: "3:45", image: "https://picsum.photos/50/50?random=1" },
                { title: "Song B", artist: "Artist 2", album: "Album Y", duration: "4:00", image: "https://picsum.photos/50/50?random=2" },
                { title: "Song C", artist: "Artist 3", album: "Album Z", duration: "4:15", image: "https://picsum.photos/50/50?random=3" }
            ]
        },
        { 
            id: 2, 
            name: "Workout Mix", 
            songs: 5, 
            duration: "20 min", 
            songList: [
                { title: "Song D", artist: "Artist 4", album: "Album A", duration: "4:30", image: "https://picsum.photos/50/50?random=4" },
                { title: "Song E", artist: "Artist 5", album: "Album B", duration: "3:50", image: "https://picsum.photos/50/50?random=5" }
            ]
        }
    ]);

    const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0]);

    const handlePlaylistClick = (playlist) => {
        setSelectedPlaylist(playlist);
    };

    const deleteSong = (playlistId, songIndex) => {
        setPlaylists(playlists.map(pl => 
            pl.id === playlistId ? { 
                ...pl, 
                songs: pl.songs - 1, 
                songList: pl.songList.filter((_, i) => i !== songIndex) 
            } : pl
        ));
        if (selectedPlaylist.id === playlistId) {
            setSelectedPlaylist({
                ...selectedPlaylist,
                songs: selectedPlaylist.songs - 1,
                songList: selectedPlaylist.songList.filter((_, i) => i !== songIndex)
            });
        }
    };

    return (
        <div className="playlists-page">
            {/* Left Column - Playlist List */}
            <div className="playlist-menu">
                {playlists.map((playlist) => (
                    <div 
                        key={playlist.id} 
                        className={`playlist-item ${selectedPlaylist.id === playlist.id ? "active" : ""}`} 
                        onClick={() => handlePlaylistClick(playlist)}
                    >
                        <img src={`https://picsum.photos/100/100?random=${playlist.id}`} alt="Album Cover" className="playlist-cover" />
                        <div className="playlist-info">
                            <div className="playlist-name">{playlist.name}</div>
                            <div className="playlist-details">{playlist.songs} songs • {playlist.duration}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Column - Playlist Details */}
            {selectedPlaylist && (
                <div className="playlist-content">
                    <div className="playlist-header">
                        <img src="https://picsum.photos/100/100?random=2" alt="Album Cover" className="playlist-image" />
                        <div className="playlist-meta">
                            <h2>{selectedPlaylist.name}</h2>
                            <p>{selectedPlaylist.songs} songs • {selectedPlaylist.duration}</p>
                        </div>
                    </div>

                    <div className="song-list">
                        <div className="song-list-header">
                            <span>Track</span>
                            <span>Album</span>
                            <span>Duration</span>
                            <span>Actions</span>
                        </div>
                        {selectedPlaylist.songList.length > 0 ? (
                            selectedPlaylist.songList.map((song, index) => (
                                <div key={index} className="song-item">
                                    <div className="song-info">
                                        <img src={song.image} alt="Song Thumbnail" className="song-thumbnail" />
                                        <div>
                                            <span className="song-title">{song.title}</span>
                                            <span className="song-artist">{song.artist}</span>
                                        </div>
                                    </div>
                                    <span className="song-album">{song.album}</span>
                                    <span className="song-duration">{song.duration}</span>
                                    <div className="song-actions">
                                        <button className="edit-song-btn">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className="delete-song-btn" onClick={() => deleteSong(selectedPlaylist.id, index)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="empty-message">No songs added yet.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Playlists;