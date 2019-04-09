import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import TopSong from '../TopSong/TopSong';
import ForwardButton from '../../UI/ForwardButton/ForwardButton';
import BackButton from '../../UI/BackButton/BackButton';
import queryString from 'query-string';
import SpotifyConnection from '../Home/SpotifyConnection';

class Home extends Component {
    state= {
        connect: false,
    }
    componentDidMount() {
        if (queryString.parse(window.location.search).spotifyToken) {
            let spotifyToken = queryString.parse(window.location.search).spotifyToken
            sessionStorage.setItem('SpotifyToken', spotifyToken)
            this.setState({connect: true})
        }
    }

    render() {
        let connect = null;
        if(this.state.connect){
            connect = <SpotifyConnection />
        }
        let username = null;
        if (sessionStorage.getItem('username')) {
            username = 'Hello ' + sessionStorage.getItem('username') + '!';
        }
        const welcomeMessage = (
            <Auxiliary>
                <p>In this application you can search for your favorite songs and artists. Or discover new songs and top hits!
                    This application uses the musiXmatch API. Sign in and keep track of your searches and favorite songs</p>
                    <p>Connect your profile with your Spotify Premium account to gain access to extra features!</p>
                <p>(This application is still a working progress)</p>
            </Auxiliary>
        )
        return (
            <Auxiliary>
                {connect}
                <BackButton history={this.props.history} />
                <ForwardButton history={this.props.history} />
                <h1>Welcome to the Music app</h1>
                <p>{username}</p>
                {welcomeMessage}
                <div>
                    <h1>Top songs right now!</h1>
                    <TopSong />
                </div>
            </Auxiliary>
        )
    }
}
export default Home;
