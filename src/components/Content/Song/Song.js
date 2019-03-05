import React from 'react';
import classes from './Song.module.css';

const song = (props) => {
    return (
        <article className={classes.Song}>
            <h2>{props.artist}</h2>
            <p>-- {props.trackName} --</p>
        </article>
    )
}

export default song;