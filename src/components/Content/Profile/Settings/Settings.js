import React, { Component } from 'react';
import UpdateForm from '../../../Authorization/Signup/UpdateInfo';
import Spinner from '../../../UI/Spinner/Spinner';
import Auxiliary from '../../../../hoc/Auxiliary';
import { Link, Redirect } from 'react-router-dom';
import Favorite from '../Favorites/Favorite';
import PreviousSearch from '../PreviousSearch/PreviousSearch';
import axios from 'axios';
import classes from './Settings.module.css';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import BackButton from '../../../UI/BackButton/BackButton';
import ForwardButton from '../../../UI/ForwardButton/ForwardButton';
import ChangePassword from '../../../Authorization/Signup/ChangePassword';

class Settings extends Component {
    state = {
        updateInfo: false,
        accountDeleted: false,
        changePassword: false,
    }

    getUserInformation = () => {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/users/' + sessionStorage.getItem('token'),
            headers: {
                'Authorization': sessionStorage.getItem('token'),
            },

        }).then(response => {
            console.log(response)
            const loadedUser = {
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                username: response.data.username,
                email: response.data.email,
            }
            this.setState({ userInformation: loadedUser })
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
        this.getUserInformation();
        this.getFavoriteSongs();
        this.getPrevSearches();
    }
    clearFavorites = () => {
        axios({
            method: 'DELETE',
            url: 'http://localhost:8080/delete/favorites/' + sessionStorage.getItem('token'),
            headers: {
                'Authorization': sessionStorage.getItem('token'),
            }
        }).then(response => {
            console.log(response)
            if (response.status === 200) {
                this.setState({ changesMade: true })
            }
        }).catch(error => {
            console.log(error)
        })
    }
    clearHistory = () => {
        axios({
            method: 'DELETE',
            url: 'http://localhost:8080/delete/searches/' + sessionStorage.getItem('token'),
            headers: {
                'Authorization': sessionStorage.getItem('token'),
            }
        }).then(response => {
            console.log(response)
            if (response.status === 200) {
                this.setState({ changesMade: true })
            }
        }).catch(error => {
            console.log(error)
        })
    }
    componentDidUpdate() {
        if (this.state.changesMade) {
            this.setState({ changesMade: false }, () => {
                this.componentDidMount();
            })
        }
    }
    updateInformation = () => {
        this.setState({ updateInfo: !this.state.updateInfo })
    }
    changePassword = () => {
        this.setState({ changePassword: !this.state.changePassword })
    }
    cancelClicked = () => {
        this.setState({ updateInfo: false, changePassword: false });
    }
    deleteAccount = () => {
        axios({
            method: 'DELETE',
            url: 'http://localhost:8080/delete/user/' + sessionStorage.getItem('token'),
            headers: {
                'Authorization': sessionStorage.getItem('token'),
            }
        }).then(response => {
            console.log(response)
            if (response.status === 200) {
                sessionStorage.clear();
                this.setState({ accountDeleted: true })
            }
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        if (this.state.accountDeleted) {
            return <Redirect to="/home" />;
        }
        let favorites = this.state.error ? <p>Something went wrong!</p> : <Spinner />
        let searches = this.state.error ? <p>Something went wrong!</p> : <Spinner />
        if (this.state.favorites) {
            if (this.state.favorites.length === 0) {
                favorites = <p>You have no favorite songs yet! Start browsing</p>
            } else {
                favorites = this.state.favorites.map(favorite => {
                    return (<Favorite
                        key={favorite.id}
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
                searches = <p>Your history is clear</p>
            } else {
                searches = this.state.searches.map(track => {
                    return (
                        <Link
                            to={"/search/" + track.searchWord}>
                            <PreviousSearch
                                key={track.id}
                                searchWord={track.searchWord}
                            />
                        </Link>
                    )
                })
            }
        }
        let userInformation = this.state.error ? <p>Something wen't wrong!</p> : <Spinner />;
        if (this.state.userInformation) {
            if (this.state.updateInfo) {
                userInformation =  <UpdateForm
                        firstName={this.state.userInformation.firstName}
                        lastName={this.state.userInformation.lastName}
                        email={this.state.userInformation.email}
                        username={this.state.userInformation.username}
                        cancelClicked={this.cancelClicked}
                        change={this.change}
                    />
            } else if (this.state.changePassword) {
                userInformation = <ChangePassword
                    cancelClicked={this.cancelClicked}
                />
            } else {
                userInformation = (
                    <Auxiliary>
                        <h3><u>Username</u></h3><p>{this.state.userInformation.username} </p>
                        <h3><u>firstname</u></h3><p>{this.state.userInformation.firstName} </p>
                        <h3><u>lastname</u></h3><p>{this.state.userInformation.lastName}</p>
                        <h3><u>email</u></h3><p>{this.state.userInformation.email}</p>
                        <Button
                            size="medium"
                            className={this.props.classes.button}
                            onClick={this.updateInformation}
                        >Update information</Button>
                        <Button
                            size="medium"
                            className={this.props.classes.button}
                            onClick={this.changePassword}
                        >Change Password</Button>
                    </Auxiliary>
                )
            }

        }
        return (
            <Auxiliary>
                <BackButton history={this.props.history} />
                <ForwardButton history={this.props.history} />

                <div className={classes.Settings}>
                    <h1>Settings</h1>
                    <h2>Your Information</h2>
                    <div className={classes.userInfo}>
                        {userInformation}
                    </div>
                    <hr />
                    <div className={classes.FlexBox}>
                        <div className={classes.Favorites}>
                            <h2>Your Favorites</h2>
                            {favorites}
                            <Button
                                size="small"
                                className={this.props.classes.button}
                                onClick={this.clearFavorites}
                            >Clear favorites</Button>
                        </div>
                        <div className={classes.PrevSearches}>
                            <h2>Your History</h2>
                            {searches}
                            <Button
                                size="small"
                                className={this.props.classes.button}
                                onClick={this.clearHistory}
                            >Clear history</Button>
                        </div>
                    </div>
                    <hr />
                    <h2>Had enough?</h2>
                    <Button
                        size="small"
                        className={this.props.classes.button}
                        onClick={this.deleteAccount}
                    >Delete user</Button>
                    <h3>If you feel like leaving completely</h3>
                </div>
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

export default withStyles(styles)(Settings);