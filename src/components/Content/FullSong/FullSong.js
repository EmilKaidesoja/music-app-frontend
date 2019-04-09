import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Spinner from '../../UI/Spinner/Spinner';
import { Link, Redirect } from 'react-router-dom';
import musixmatch from '../../Utils/musixmatch';
import AlbumTrack from './AlbumTrack/AlbumTrack';
import classes from './FullSong.module.css';
import BackButton from '../../UI/BackButton/BackButton';
import ForwardButton from '../../UI/ForwardButton/ForwardButton';
import FavoriteButton from '../../UI/FavoriteButton/FavoriteButton';
import axios from 'axios';
import Popup from '../../UI/Popup/Popup';
import spotify from '../../Utils/spotify';
import SpotifyFullSong from './Spotify/SpotifyFullSong/SpotifyFullSong';
import SpotifyDisabled from '../../UI/SpotifyDisabled/SpotifyDisabled';

class FullSong extends Component {
    state = {
        showPopup: false,
        redirectToLogin: false,
        spotifyConnection: true,
        lyricsError: false,
    }

    getMusiXmatchData = () => {
        musixmatch.get(`track.get?commontrack_id=  ${this.props.match.params.id}  &apikey=${process.env.REACT_APP_MM_API_KEY}`)
            .then(response => {
                const loadedSong = {
                    artist: response.data.message.body.track.artist_name,
                    songName: response.data.message.body.track.track_name,
                    albumName: response.data.message.body.track.album_name,
                }
                const loadedAlbumId = response.data.message.body.track.album_id;
                this.setState({ fullSong: loadedSong, albumId: loadedAlbumId, }, () => {
                    this.getAlbumTracks();
                    //Checks if the user has connected to Spotify
                    if (sessionStorage.getItem('SpotifyToken')) {
                        this.CheckIfArtistNameIsInvalid();
                    } else {
                        this.setState({ spotifyConnection: false })
                    }
                })
            }).catch(error => {
                console.log(error);
            })
    }
    getLyrics = () => {
        musixmatch.get(`track.lyrics.get?commontrack_id=  ${this.props.match.params.id}  &apikey=${process.env.REACT_APP_MM_API_KEY}`)
            .then(response => {
                const loadedLyrics = response.data.message.body.lyrics.lyrics_body;
                this.setState({ lyrics: loadedLyrics, lyricsError: false })
            }).catch(error => {
                console.log(error);
                this.setState({ lyricsError: true })
            })
    }
    getAlbumTracks = () => {
        musixmatch.get('album.tracks.get?album_id=' + this.state.albumId + `&page=1&page_size=10&apikey=${process.env.REACT_APP_MM_API_KEY}`)
            .then(response => {
                const loadedTracks = response.data.message.body.track_list;
                const updatedTracks = loadedTracks.map(track => {
                    return {
                        ...track
                    }
                })
                this.setState({ albumTracks: updatedTracks })
            }).catch(AlbumTracksError => {
                console.log(AlbumTracksError)
            })
    }
    componentDidMount() {
        this.getMusiXmatchData();
        this.getLyrics();
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.getMusiXmatchData();
            this.getLyrics();
        }
    }
    addTofavorites = () => {
        if (sessionStorage.getItem('token') === null) {
            this.setState({ redirectToLogin: true })
        } else {
            axios({
                method: 'post',
                url: `${process.env.REACT_APP_BACKEND}addFavoriteSong/` + sessionStorage.getItem('token'),
                headers: {
                    'Authorization': sessionStorage.getItem('token'),
                },
                data: {
                    id: this.props.match.params.id,
                    artistName: this.state.fullSong.artist,
                    songName: this.state.fullSong.songName,
                }
            }).then(response => {
                if (response.status === 200) {
                    this.OpenAndClosePopup();
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }
    OpenAndClosePopup() {
        this.setState({ showPopup: true }, () => {
            setTimeout(() => this.setState({ showPopup: false }), 2000);
        }
        )
    }

    //If the artist name contains invalid characters this method removes them
    CheckIfArtistNameIsInvalid = () => {
        let artistName = null;
        let fullSong = null;
        switch (true) {
            case (this.state.fullSong.artist.includes('feat')):

                artistName = this.state.fullSong.artist.slice(0, this.state.fullSong.artist.indexOf('feat'))
                fullSong = Object.assign({}, this.state.fullSong);
                fullSong.artist = artistName;
                this.setState({ fullSong }, () => {
                    this.getSpotifyArtist();
                    this.getSpotifySong();
                })
                break;
            case (this.state.fullSong.artist.includes('&')):

                artistName = this.state.fullSong.artist.slice(0, this.state.fullSong.artist.indexOf('&'))
                fullSong = Object.assign({}, this.state.fullSong);
                fullSong.artist = artistName;
                this.setState({ fullSong }, () => {
                    this.getSpotifyArtist();
                    this.getSpotifySong();
                })
                break;
            default:
                this.getSpotifyArtist();
                this.getSpotifySong();
                break;
        }
    }

    getSpotifyArtist = () => {
        spotify({
            method: 'get',
            url: 'search',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('SpotifyToken'),
            },
            params: {
                q: this.state.fullSong.artist,
                type: 'artist',
            },
        }).then(response => {
            const img = response.data.artists.items[0].images[0].url;
            const id = response.data.artists.items[0].id;
            this.setState({ artistImage: img, artistId: id })
        }).catch(error => {
            console.log(error)
            this.setState({ spotifyConnection: false })
        })
    }

    getSpotifySong = () => {
        spotify({
            method: 'get',
            url: 'search',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('SpotifyToken'),
            },
            params: {
                q: this.state.fullSong.songName + " " + this.state.fullSong.artist,
                type: 'track',
            },
        }).then(response => {
            const songName = response.data.tracks.items[0].name;
            const songUri = response.data.tracks.items[0].uri;
            const songLengthInMS = response.data.tracks.items[0].duration_ms;
            const seconds = (response.data.tracks.items[0].duration_ms / 1000) % 60;
            const minutes = (response.data.tracks.items[0].duration_ms / 1000 - seconds) / 60;
            const songLength = minutes + ":" + Math.floor(seconds);
            this.setState({ songName: songName, songUri: songUri, songLength: songLength, songLengthInMS: songLengthInMS })
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        //These expressions check if the connection to spotify has been made and if the token is still viable
        let SpotifySection = this.props.spotifyConnection ? <Spinner /> : sessionStorage.getItem('SpotifyToken') ? <p>Token expired</p> : <SpotifyDisabled history={this.props.history}/>
        if (this.state.artistId && sessionStorage.getItem('deviceId') !== null) {
            SpotifySection = <SpotifyFullSong
                songUri={this.state.songUri}
                artistId={this.state.artistId}
                artist={this.state.fullSong.artist}
                songName={this.state.songName}
                songLength={this.state.songLength}
                songLengthInMS={this.state.songLengthInMS}
            />;
        }
        let image = this.state.spotifyConnection ? <Spinner /> : sessionStorage.getItem('SpotifyToken') ? <p>Token expired</p> : null
        if (this.state.artistImage) {
            image = (<img
                className={classes.Image}
                src={this.state.artistImage}
                alt="artist"
            />);
        }
        //if the user tries to favorite the song while not logged in
        if (this.state.redirectToLogin) {
            return <Redirect to="/login" />
        }
        let popup = this.state.showPopup ? <Popup
            artist={this.state.fullSong.artist}
            song={this.state.fullSong.songName}
        />
            : null
        let albumTracks = this.state.AlbumTracksError ? <p>Something wen't wrong</p> : <Spinner />
        if (this.state.albumTracks) {
            albumTracks = this.state.albumTracks.map(track => {
                return (
                    <Auxiliary>
                        <Link
                            to={"/song/" + track.track.commontrack_id}
                        >
                            <AlbumTrack
                                key={track.track.commontrack_id}
                                artist={track.track.artist_name}
                                trackName={track.track.track_name}
                            />
                        </Link>
                    </Auxiliary>
                )
            })
        }
        let lyrics = this.state.error ? <p>Something wen't wrong</p> : <Spinner />
        let fullSong = this.state.error ? <p>Something wen't wrong</p> : <Spinner />
        if (this.state.fullSong) {
            fullSong = (
                <Auxiliary>

                    <div className={classes.InlineFlex}>
                        <div>
                            <h1>{this.state.fullSong.songName}</h1>
                            <h2>by - {this.state.fullSong.artist}</h2>
                            <p>Album - {this.state.fullSong.albumName}</p>
                        </div>
                        {image}
                    </div>

                </Auxiliary>
            )
            if (!this.state.lyricsError) {
                lyrics = (
                    <div className={classes.Lyrics}>
                        <h3>Lyrics</h3>
                        <p>{this.state.lyrics}</p>
                    </div>
                )
            } else {
                lyrics = (
                    <div className={classes.Lyrics}>
                        <h3>Lyrics</h3>
                        <p>Lyrics not available. Please try another song!</p>
                    </div>
                )
            }
        }
        return (
            <Auxiliary>
                {popup}
                <BackButton history={this.props.history} />
                <ForwardButton history={this.props.history} />
                {fullSong}

                <div className={classes.FlexBox}>
                    <div className={classes.CompleteAlbum}>
                        <h3>Complete album</h3>
                        {albumTracks}
                    </div>
                    {lyrics}
                </div>
                <FavoriteButton
                    clicked={this.addTofavorites}
                />
                {SpotifySection}
            </Auxiliary>
        )
    }
}

export default FullSong;