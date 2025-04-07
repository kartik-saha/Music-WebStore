import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faShuffle, faStepBackward, faStepForward, faRedo, faHeart, faMusic } from '@fortawesome/free-solid-svg-icons';
import './MediaPlayerModal.css';

const MediaPlayerModal = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [liked, setLiked] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const audioRef = useRef(null);
    
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.ontimeupdate = () => {
                setCurrentTime(audioRef.current.currentTime);
            };
        }
    }, []);

    const handlePlayPause = () => {
        if (audioRef.current) {
            isPlaying ? audioRef.current.pause() : audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleLikeToggle = () => {
        setLiked(!liked);
    };

    const handleSeek = (e) => {
        if (audioRef.current) {
            const newTime = (e.nativeEvent.offsetX / e.target.offsetWidth) * audioRef.current.duration;
            setCurrentTime(newTime);
            audioRef.current.currentTime = newTime;
        }
    };

    // Show modal immediately on hover
    const showModal = () => setIsVisible(true);

    // Hide modal & show button smoothly without delay
    const hideModal = () => setIsVisible(false);

    return (
        <div className="media-player-wrapper">
            {/* Music Note Toggle Button */}
            <button 
                className={`music-toggle-btn ${isVisible ? 'hide-music-toggle' : 'show-music-toggle'}`} 
                onMouseEnter={showModal}
            >
                <FontAwesomeIcon icon={faMusic} />
            </button>

            {/* Media Player Modal */}
            <div
                className={`media-player-modal-container ${isVisible ? '' : 'media-player-hidden'}`}
                onMouseEnter={showModal}
                onMouseLeave={hideModal}
            >
                {/* Audio Element */}
                <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" preload="auto" />

                {/* Seek Bar */}
                <div className="seek-bar-container" onClick={handleSeek}>
                    <div className="seek-bar">
                        <div className="seek-progress" style={{ width: `${(currentTime / (audioRef.current?.duration || 1)) * 100}%` }} />
                        <div className="seek-text">
                            <span>{Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}</span>
                            <span>{audioRef.current?.duration ? `${Math.floor(audioRef.current.duration / 60)}:${String(Math.floor(audioRef.current.duration % 60)).padStart(2, '0')}` : '0:00'}</span>
                        </div>
                    </div>
                </div>

                {/* Media Content */}
                <div className="media-content">
                    {/* Cover Image */}
                    <img src="https://via.placeholder.com/150" alt="Album Cover" className="media-cover" />

                    {/* Media Info */}
                    <div className="media-info">
                        <div className="song-title-heart">
                            <div className="song-title">Song Name</div>
                            <button className="heart-btn" onClick={handleLikeToggle}>
                                <FontAwesomeIcon icon={faHeart} color={liked ? 'var(--primary-accent)' : 'var(--primary-bg)'} />
                            </button>
                        </div>

                        <div className="artist-album">
                            <div className="artist-name">Artist Name</div>
                            <div className="album-name">Album Name</div>
                        </div>

                        {/* Controls */}
                        <div className="controls">
                            <button className="control-btn"><FontAwesomeIcon icon={faShuffle} /></button>
                            <button className="control-btn"><FontAwesomeIcon icon={faStepBackward} /></button>
                            <button className="control-btn" onClick={handlePlayPause}>
                                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                            </button>
                            <button className="control-btn"><FontAwesomeIcon icon={faStepForward} /></button>
                            <button className="control-btn"><FontAwesomeIcon icon={faRedo} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaPlayerModal;
