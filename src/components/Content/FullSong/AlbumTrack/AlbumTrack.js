import React from 'react';
import classes from './AlbumTrack.module.css';

const albumTrack = (props) => {
    return(
        <article className={classes.AlbumTrack}>
        <p>{props.trackName}</p>
    </article>
    )
}

export default albumTrack;