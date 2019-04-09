import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

class SpotifyDisabled extends Component {
    render() {
        return(
            <div>
                <p>Connect to Spotify to see more!</p>
                <Button
                        size="large"
                        classes={{
                            root: this.props.classes.button
                        }}
                        onClick={() => this.props.history.push("/profile")}
                    >Connect</Button>
            </div>
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
        },
    },
}
export default withStyles(styles) (SpotifyDisabled);