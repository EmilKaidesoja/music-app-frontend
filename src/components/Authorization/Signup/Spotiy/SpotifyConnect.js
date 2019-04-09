import React, { Component } from 'react';
import classes from './SpotifyConnect.module.css';

class SpotifyConnect extends Component {
    render() {
        return (
            <div className={classes.Spotify}>
                <h2>Spotify</h2>
                <p><u>Connect</u> your account to Spotify here!</p>
                <p>This will give you access to new features, like listening to songs, that are only available through Spotify!</p>
                <p>This requires* a Spotify Premium account.</p>
                 <a href={`${process.env.REACT_APP_BACKEND}spotify/connect/` + sessionStorage.getItem('token')}>CONNECT WITH SPOTIFY</a>
            </div>
        )
    }
}
export default SpotifyConnect;