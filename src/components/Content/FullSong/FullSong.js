import React, { Component } from 'react';
import Axios from 'axios';
import Auxiliary from '../../../hoc/Auxiliary';
import Spinner from '../../UI/Spinner/Spinner';

class FullSong extends Component {
    state = {
        fullSong: null,
    }

    componentDidMount() {
        Axios.get('track.get?commontrack_id=' + this.props.match.params.id + '&apikey=a46e6b9fb2640fd377cde18fc2d20f51')
            .then(response => {
                console.log(response.data.message.body.track)
                const loadedSong = {
                    artist: response.data.message.body.track.artist_name,
                    songName: response.data.message.body.track.track_name,
                    albumName: response.data.message.body.track.album_name,
                }
                this.setState({ fullSong: loadedSong })
            }).catch(error => {
                console.log(error);
            })
    }

    render() {
        let fullSong = this.state.error ? <p>Something went wrong</p> : <Spinner />
        if (this.state.fullSong) {
           fullSong = (
                <Auxiliary>
                    <h1>{this.state.fullSong.artist}</h1>
                    <p>{this.state.fullSong.songName}</p>
                    <p>Album : {this.state.fullSong.albumName}</p>
                </Auxiliary>
            )
        }
        return fullSong;
    }
}

export default FullSong;