import React from 'react';
import classes from './Popup.module.css';
import Favorite from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';

const popup = (props) => {
    return (
        <div className={classes.Popup}>
            <div className={classes.PopupInner}>
                <h2>Aww yeah!
                    <br />
                    Song Favorited!</h2>
                    <Favorite 
                    classes = {{
                        root: props.classes.Favorite
                    }}/>
            </div>
        </div>
    );
}
const styles = {
    Favorite: {
        color: 'rgb(90, 30, 30)',
        height: '60%',
        width: 'auto',
    }
}
export default withStyles(styles)(popup);