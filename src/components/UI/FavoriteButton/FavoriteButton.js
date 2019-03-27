import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classes from './FavoriteButton.module.css';

class FavoriteButton extends Component {
    render() {
        return (
            <div className={classes.Favorite}>
                <p>Add to Favorites</p>
                <FavoriteBorder
                    classes={{
                        root: this.props.classes.favoriteBorder,
                    }}
                    onClick={this.props.clicked}
                />
            </div>
        )
    }
}
const styles = {
    favoriteBorder: {
        color: '#af4141',
        fontSize: '35px',
        '&:hover': {
            cursor: 'pointer',
            color: '#6b1612',
        }
    }
}
export default withStyles(styles)(FavoriteButton);