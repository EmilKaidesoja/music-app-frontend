import React, { Component } from 'react';
import axios from 'axios';
import Auxiliary from '../../../../hoc/Auxiliary';
import classes from './Results.module.css';
import Track from './Track/Track';
import Spinner from '../../../UI/Spinner/Spinner';
import { Link } from 'react-router-dom';


class Result extends Component {
    state = {
        resultSongs: null,
        resultPage: 1,
    }

    loadData() {
        axios.get("track.search?q_artist=" + this.props.match.params.search + "&page_size=15&page=" + this.state.resultPage + "&s_track_rating=desc&apikey=a46e6b9fb2640fd377cde18fc2d20f51")
            .then(response => {
                console.log(response.data.message);
                const resultSongs = response.data.message.body.track_list;
                const updatedSongs = resultSongs.map(song => {
                    return {
                        ...song,
                    }
                });
                this.setState({ resultSongs: updatedSongs })
            }).catch(error => {
                console.log(error);
            })
    }
    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.search !== prevProps.match.params.search) {
            this.setState({ resultSongs: null, resultPage: 1 }, () => {
                this.loadData();
            })

        }
    }

    nextPageHandler(resultPage) {
        let increment = resultPage + 1;
        this.setState({ resultPage: increment, resultSongs: null }, () => {
            this.loadData();
        })

    }


    render() {
        let resultSongs = this.state.error ? <p>Something went wrong</p> : <Spinner />
        if (this.state.resultSongs) {
            resultSongs = this.state.resultSongs.map(song => {
                return (
                        <Link
                            to={"/song/" + song.track.commontrack_id}
                            key={song.track.track_id}>
                            <Track
                                artist={song.track.artist_name}
                                trackName={song.track.track_name}
                            />
                        </Link>
                )
            })
        }
        return (
            <Auxiliary>
                <h2>Search results for {this.props.match.params.search}</h2>
                <section className={classes.Results}>
                    {resultSongs}
                    <div className={classes.PageNumber}>
                        {this.state.resultPage}
                    </div>
                    <button className={classes.NextPageButton}
                        onClick={() => this.nextPageHandler(this.state.resultPage)}
                    >Next page --> {this.state.resultPage + 1}</button>
                </section>
            </Auxiliary>
        )
    }
}
export default Result;