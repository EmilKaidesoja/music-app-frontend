import React, { Component } from 'react';
import Script from 'react-load-script';

class SpotifyConnection extends Component {
    handleScriptLoad = () => {
        return new Promise(resolve => {
            window.onSpotifyWebPlaybackSDKReady = () => {
                const token = sessionStorage.getItem('SpotifyToken');
                const player = new window.Spotify.Player({
                    name: 'MusicApp',
                    getOAuthToken: cb => { cb(token); }
                });
                player.addListener('initialization_error', ({ message }) => { console.error(message); });
                player.addListener('authentication_error', ({ message }) => { console.error(message); });
                player.addListener('account_error', ({ message }) => { console.error(message); });
                player.addListener('playback_error', ({ message }) => { console.error(message); });

                player.addListener('player_state_changed', state => { console.log(state); });
                player.addListener('ready', ({ device_id }) => {
                   sessionStorage.setItem('deviceId', device_id);
                    console.log('Ready with Device ID', device_id);
                });
                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });
                player.connect();
                if (window.Spotify) {
                    resolve();
                } else {
                    window.onSpotifyWebPlaybackSDKReady = resolve;
                }
            };
        });
    }

    render() {
        let SpotifyConnection = <Script
                url="https://sdk.scdn.co/spotify-player.js"
                onError={this.handleScriptError}
                onLoad={this.handleScriptLoad}
            />
        return (
            <div>
                {SpotifyConnection}
            </div>
        )
    }
}

export default SpotifyConnection;