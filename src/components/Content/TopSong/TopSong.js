import React, { Component } from 'react';
import Song from '../Song/Song';
import classes from './TopSong.module.css';
import { Link, } from 'react-router-dom';
import Spinner from '../../UI/Spinner/Spinner';
import musixmatch from '../../Utils/musixmatch';

class TopSongs extends Component {
    state = {
        topSongs: null,
    }
    componentDidMount() {
        musixmatch.get("chart.tracks.get?page=1&page_size=10&country=fin&apikey=a46e6b9fb2640fd377cde18fc2d20f51")
            .then(response => {
                console.log(response.data.message.body.track_list);
                const topSongs = response.data.message.body.track_list;
                const updatedSongs = topSongs.map(song => {
                    return {
                        ...song,
                    }
                });
                this.setState({ topSongs: updatedSongs })
            }).catch(error => {
                console.log(error);
            })
    }

    render() {
        let topSongs = this.state.error ? <p>Something went wrong</p> : <Spinner />
        if (this.state.topSongs) {
            topSongs = this.state.topSongs.map(song => {
                return (
                        <Link
                            to={"/song/" + song.track.commontrack_id}
                            key={song.track.track_id}>
                            <Song
                                artist={song.track.artist_name}
                                trackName={song.track.track_name}
                            />
                        </Link>
                )
            })
        }
        return (
            <section className={classes.TopSongs}>
                {topSongs}
            </section>
        )
    }
}
export default TopSongs;