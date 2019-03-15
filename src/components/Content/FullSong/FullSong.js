import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Spinner from '../../UI/Spinner/Spinner';
import { Link } from 'react-router-dom';
import musixmatch from '../../Utils/musixmatch';
import AlbumTrack from './AlbumTrack/AlbumTrack';
import classes from './FullSong.module.css';
import BackButton from '../../UI/BackButton/BackButton';
import ForwardButton from '../../UI/ForwardButton/ForwardButton';

class FullSong extends Component {
    state = {
        albumId: null,
        goForwardAvailable: false,
    }

    getData = () => {
        musixmatch.get('track.get?commontrack_id=' + this.props.match.params.id + '&apikey=a46e6b9fb2640fd377cde18fc2d20f51')
            .then(response => {
                //console.log(response.data.message)
                const loadedSong = {
                    artist: response.data.message.body.track.artist_name,
                    songName: response.data.message.body.track.track_name,
                    albumName: response.data.message.body.track.album_name,
                }
                const loadedAlbumId = response.data.message.body.track.album_id;
                this.setState({ fullSong: loadedSong, albumId: loadedAlbumId, }, () => {
                    this.getAlbumTracks();
                })
            }).catch(error => {
                console.log(error);
            })
    }
    getLyrics = () => {
        musixmatch.get('track.lyrics.get?commontrack_id=' + this.props.match.params.id + '&apikey=a46e6b9fb2640fd377cde18fc2d20f51')
            .then(response => {
                // console.log(response.data.message)
                const loadedLyrics = response.data.message.body.lyrics.lyrics_body;
                this.setState({ lyrics: loadedLyrics })
            }).catch(error => {
                console.log(error);
            })
    }
    getAlbumTracks = () => {
        musixmatch.get('album.tracks.get?album_id=' + this.state.albumId + '&page=1&page_size=10&apikey=a46e6b9fb2640fd377cde18fc2d20f51')
            .then(response => {
                console.log(response.data.message)
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
        this.getData();
        this.getLyrics();

    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.getData();
            this.getLyrics();
        }
    }
    arrowBackPressed = () => {
        this.props.history.goBack();
    }

    arrowForwardPressed = () => {
        this.props.history.goForward();
    }

    render() {
        let albumTracks = this.state.AlbumTracksError ? <p>Something wen't wrong</p> : <Spinner />
        if (this.state.albumTracks) {
            albumTracks = this.state.albumTracks.map(track => {
                return (
                    <Auxiliary>
                        <Link
                            to={"/song/" + track.track.commontrack_id}
                            key={track.track.commontrack_id}>
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
                    <h1>{this.state.fullSong.artist}</h1>
                    <h2>{this.state.fullSong.songName}</h2>
                    <p>Album - {this.state.fullSong.albumName}</p>
                </Auxiliary>
            )
            if (this.state.lyrics !== undefined) {
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
        let goForwardButton = (
            <ForwardButton
            clicked={this.arrowForwardPressed}
        />
        )

        return (
            <Auxiliary>
              {goForwardButton}
                <BackButton
                    clicked={this.arrowBackPressed}
                />
                {fullSong}
                <div className={classes.FlexBox}>
                    <div className={classes.CompleteAlbum}>
                        <h3>Complete album</h3>
                        {albumTracks}
                    </div>
                    {lyrics}
                </div>
            </Auxiliary>
        )
    }
}

export default FullSong;