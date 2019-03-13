import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import TopSongs from '../topSongs/TopSongs.js';

class Home extends Component {
    render() {
        const welcomeMessage = (
            <Auxiliary>
                <h1>Welcome to the music app</h1>
                    <p>Hello user!</p>
                    <p>In this application you can search for your favorite songs and artists. Or discover new songs and top hits!
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
              
            </Auxiliary>
        )
    }
}
export default Home;
