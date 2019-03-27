import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

class SpotifyConncect extends Component {
    render() {
        return (
            <div>
                <h2>Spotify</h2>
                <p><u>Connect</u> your account to Spotify here!</p>
                <p>This will give you access to new features, like listening to songs, that are only available through Spotify!</p>
                <p>This requires* a Spotify Premium account.</p>
                <h2>NOT working at this moment!</h2>
                <Button
                    size="large"
                    classes={{
                        root: this.props.classes.button
                    }}
                    onClick={this.props.clicked}
                >Connect With Spotify</Button>
            </div>
        )
    }
}
const styles = {
    button: {
        margin: '10px',
        backgroundColor: '#008000',
        color: 'white',
        border: '1px solid lightGrey',
        borderRadius: '20px',
        '&:hover': {
            color: 'white',
            borderColor: '#008000',
            backgroundColor: '#008000',
        },
    }
}
export default withStyles(styles)(SpotifyConncect);