import React, { Component } from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withStyles } from '@material-ui/core/styles';

class BackButton extends Component {
    clicked = () => {
        this.props.history.goBack();
    }
    render() {
        return (
            <ArrowBack
                classes={{
                    root: this.props.classes.arrowBack,
                }}
                onClick={() => this.clicked()}
            />
        )
    }
}
const styles = {
    arrowBack: {
        color: 'white',
        float: 'left',
        marginTop: '25px',
        fontSize: '35px',
        '&:hover': {
            cursor: 'pointer',
            color: '#866068',
        }
    }
}
export default withStyles(styles)(BackButton);



