import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import TopSongs from '../topSongs/TopSongs.js';

class Home extends Component {
    render() {
        const welcomeMessage = (
            <Auxiliary>
                <h1>Welcome to the music app</h1>
                    <p>Hello user!</p>
                    <p>This is an application to search for your favorite songs, as well as discover new songs and top hits!
                    This application uses the musiXmatch API for the data.</p> 
                    <p>(This application is still a working progress)</p>
            </Auxiliary>
        )
        return (
            <Auxiliary>
                    {welcomeMessage}
                    <hr />
                <div>
                    <h1>Top songs right now!</h1>
                    <TopSongs />
                </div>
                <hr />
                <div>
                    <h1>Profile</h1>
                    <p>Favorite genres etc.</p>
                </div>
                <hr />
            </Auxiliary>
        )
    }
}
export default Home;
