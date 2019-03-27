import React, { Component } from 'react';
import musixmatch from '../../../Utils/musixmatch';
import Auxiliary from '../../../../hoc/Auxiliary';
import classes from './Results.module.css';
import Track from './Track/Track';
import Spinner from '../../../UI/Spinner/Spinner';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../../../UI/BackButton/BackButton';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


class Result extends Component {
    state = {
        resultSongs: null,
        resultPage: 1,
        blankSearch: false,
    }

    getResults() {
        musixmatch.get("track.search?q_track_artist=" + this.props.match.params.search + "&page_size=15&page="
            + this.state.resultPage + `&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_API_KEY}`)
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
    postSearch = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/postSearch/' + sessionStorage.getItem('token'),
            headers: {
                'Authorization': sessionStorage.getItem('token'),
            },
            data: {
                searchWord: this.props.match.params.search,
            }
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }
    componentDidMount() {
        //checks if the search is blank
        if (this.props.match.params.search !== undefined) {
            this.getResults();

        } else {
            this.setState({ blankSearch: true })
        }
    }

    componentDidUpdate(prevProps) {
        //checks for blank search and if the same search is repeated
        if (this.props.match.params.search !== undefined) {
            if (this.props.match.params.search !== prevProps.match.params.search) {
                this.setState({ resultSongs: null, resultPage: 1, blankSearch: false }, () => {
                    this.getResults();
                })
            }
        } else if (this.state.blankSearch === false) {
            this.setState({ blankSearch: true })
        }
        //the searches does not get recorded if user is not logged in or the search is blank
        if (sessionStorage.getItem('token') !== null && this.state.blankSearch !== true) {
            this.postSearch();
        }
    }
    nextPageHandler(resultPage) {
        if (this.state.blankSearch) { return };
        let increment = resultPage + 1;
        this.setState({ resultPage: increment, resultSongs: null }, () => {
            this.getResults();
        })

    }
    previousPageHandler(resultPage) {
        let decrement = resultPage - 1;
        this.setState({ resultPage: decrement, resultSongs: null }, () => {
            this.getResults();
        })
    }
    arrowBackPressed = () => {
        this.props.history.goBack();
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
                        >
                            <Track
                                key={song.track.track_id}
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
                <BackButton
                    clicked={this.arrowBackPressed}
                />
                {message}
                <section className={classes.Results}>
                    {resultSongs}
                    <div className={classes.PageNumber}>
                        {this.state.resultPage}
                    </div>
                    {previousPage}
                    <Button
                            size="medium"
                            className={this.props.classes.button}
                            onClick={() => this.nextPageHandler(this.state.resultPage)}
                        >NEXT PAGE</Button>      
                </section>
            </Auxiliary>
        )
    }
}
const styles = {
    button: {
        margin: '10px',
        color: 'white',
        border: '1px solid white',
        '&:hover': {
            color: '#866068',
            borderColor: '#866068',
        }
    }
}
export default withStyles(styles)(Result);