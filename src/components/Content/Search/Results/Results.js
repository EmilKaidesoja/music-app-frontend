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
        blankSearch: false,
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
        if (this.props.match.params.search !== undefined) {
            this.loadData();

        } else {
            this.setState({ blankSearch: true })
        }

    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.search !== undefined) {
            if (this.props.match.params.search !== prevProps.match.params.search) {
                this.setState({ resultSongs: null, resultPage: 1, blankSearch: false }, () => {
                    this.loadData();
                })
            }
        } else if(this.state.blankSearch === false) {
                this.setState({ blankSearch: true })
            }
        }

    nextPageHandler(resultPage) {
        let increment = resultPage + 1;
        this.setState({ resultPage: increment, resultSongs: null }, () => {
            this.loadData();
        })

    }
    previousPageHandler(resultPage) {
        let decrement = resultPage - 1;
        this.setState({ resultPage: decrement, resultSongs: null }, () => {
            this.loadData();
        })
    }


    render() {
        let previousPage = null;
        if (this.state.resultPage > 1) {
            previousPage = (
                <button className={classes.PageButton}
                    onClick={() => this.previousPageHandler(this.state.resultPage)}
                >Previous page</button>
            )
        }
        let message = null;
        let resultSongs = null;
        if (!this.state.blankSearch) {
            resultSongs = this.state.error ? <p>Something went wrong</p> : <Spinner />
            if (this.state.resultSongs) {
                message = <h2>Search results for {this.props.match.params.search}</h2>
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
        } else {
            message = (
                <div>
                    <p>No results for a 'blank' search word.</p>
                    <p> Please search again!</p>
                </div>)
        }
        return (
            <Auxiliary>
                {message}
                <section className={classes.Results}>
                    {resultSongs}
                    <div className={classes.PageNumber}>
                        {this.state.resultPage}
                    </div>
                    {previousPage}
                    <button className={classes.PageButton}
                        onClick={() => this.nextPageHandler(this.state.resultPage)}
                    >Next page</button>
                </section>
            </Auxiliary>
        )
    }
}
export default Result;