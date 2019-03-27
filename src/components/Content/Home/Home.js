import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import TopSong from '../TopSong/TopSong';
import ForwardButton from '../../UI/ForwardButton/ForwardButton';
import BackButton from '../../UI/BackButton/BackButton';

class Home extends Component {
    render() {
        let username = null;
        if(localStorage.getItem('username')){
            username = 'Hello ' + localStorage.getItem('username') + '!';
        }
        const welcomeMessage = (
            <Auxiliary>
                <p>In this application you can search for your favorite songs and artists. Or discover new songs and top hits!
                    This application uses the musiXmatch API for the data. Sign in and keep track of your searches and favorite songs</p>
                <p>(This application is still a working progress)</p>
            </Auxiliary>
        )
        return (
            <Auxiliary>
                <BackButton history={this.props.history}/>
                <ForwardButton history={this.props.history}/>
                <h1>Welcome to the music app</h1>
                <p>{username}</p>
                {welcomeMessage}
                <hr />
                <div>
                    <h1>Top songs right now!</h1>
                    <TopSong />
                </div>
                <hr />

            </Auxiliary>
        )
    }
}
export default Home;
