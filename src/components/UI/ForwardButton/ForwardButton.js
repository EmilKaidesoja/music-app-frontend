import React, { Component } from 'react';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { withStyles } from '@material-ui/core/styles';

class ForwardButton extends Component {
    render() {
        return (
            <ArrowForward
                classes={{
                    root: this.props.classes.arrowBack,
                }}
                onClick={this.props.clicked}
            />
        )
    }
}
const styles = {
    arrowBack: {
        color: 'white',
        float: 'right',
        marginTop: '25px',
        fontSize: '35px',
        '&:hover': {
            cursor: 'pointer',
            color: '#866068',
        }
    }
}
export default withStyles(styles)(ForwardButton);



