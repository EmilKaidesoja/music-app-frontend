import React, { Component } from 'react';
import classes from './Profile.module.css';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';
import Auxiliary from '../../../hoc/Auxiliary';
import { Link } from 'react-router-dom';
import Favorite from './Favorites/Favorite';
import PreviousSearch from './PreviousSearch/PreviousSearch';
import SpotifyConnect from '../../Authorization/Signup/Spotiy/SpotifyConnect';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import BackButton from '../../UI/BackButton/BackButton';
import ForwardButton from '../../UI/ForwardButton/ForwardButton';


class Profile extends Component {
    state = {
        error: null,
    }

    getUserData = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/users/' + sessionStorage.getItem('token'),
            headers: {
                'Authorization': sessionStorage.getItem('token'),
            }
        })
            .then(response => {
                console.log(response.data)
                this.setState({ username: response.data.username, }, () => {
                    sessionStorage.setItem('username', this.state.username);
                    this.getFavoriteSongs();
                    this.getPrevSearches();
                })
            }).catch(error => {
                console.log(error)
                this.setState({ error: true })
            });
    }
    getFavoriteSongs = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/favoriteSongs/' + sessionStorage.getItem('token'),
            headers: {
                'Authorization': sessionStorage.getItem('token'),
            }
        }).then(response => {
            console.log(response)
            const loadedFavorites = response.data;
            this.setState({ favorites: loadedFavorites })
        }).catch(error => {
            console.log(error)
        });
    }
    getPrevSearches = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/prevSearches/' + sessionStorage.getItem('token'),
            headers: {
                'Authorization': sessionStorage.getItem('token'),
            }
        }).then(response => {
            console.log(response)
            const loadedSearches = response.data;
            this.setState({ searches: loadedSearches })
        }).catch(error => {
            console.log(error)
        });
    }

    componentDidMount() {
        this.getUserData();
    }
    render() {
        let favorites = this.state.error ? <p>Something went wrong!</p> : <Spinner />
        let searches = this.state.error ? <p>Something went wrong!</p> : <Spinner />
        if (this.state.favorites) {
            if (this.state.favorites.length === 0) {
                favorites = <p>You have no favorite songs yet! Start browsing</p>
            } else {
                favorites = this.state.favorites.map(favorite => {
                    return ( <Favorite
                                        key={favorite.id}
                                        history={this.props.history}
                                        songId={favorite.id}
                                        artist={favorite.artistName}
                                        trackName={favorite.songName}
                                    />
                    )
                })
            }
        }
        if (this.state.searches) {
            if (this.state.searches.length === 0) {
                searches = <p>You haven't searched for anything yet! Don't be shy</p>
            } else {
                searches = this.state.searches.map(track => {
                    return (
                        <Link to={"/search/" + track.searchWord}>
                            <PreviousSearch
                                key={track.id}
                                searchWord={track.searchWord}
                            />
                        </Link>
                    )
                })
            }
        }
        const welcome = (
            <Auxiliary>
                <h1>Welcome!!</h1>
                <h2>{this.state.username}</h2>
                <p>This is what you've been up to!</p>
            </Auxiliary>
        );
        return (
            <Auxiliary>
                <BackButton history={this.props.history} />
                <ForwardButton history={this.props.history} />
                <div className={classes.Profile}>
                    {welcome}
                    <div className={classes.FlexBox}>
                        <div className={classes.Favorites}>
                            <h2>Your Favorites</h2>
                            {favorites}
                        </div>
                        <div className={classes.PrevSearches}>
                            <h2>Visit your past searches</h2>
                            {searches}
                        </div>
                    </div>
                    <hr />
                    <SpotifyConnect />
                    <hr />
                    <Button
                        size="large"
                        classes={{
                            root: this.props.classes.Settings
                        }}
                        onClick={() => this.props.history.push("/profile/settings")}
                    >Account Settings</Button>
                </div>
            </Auxiliary>
        )
    }
}
const styles = {
    Settings: {
        margin: '10px',
        color: 'white',
        border: '1px solid white',
        '&:hover': {
            color: '#866068',
            borderColor: '#866068',
        },
    },
}

export default withStyles(styles)(Profile);