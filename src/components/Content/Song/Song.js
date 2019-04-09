import React from 'react';
import classes from './Song.module.css';

const song = (props) => {
    return (
        <article className={classes.Song}>
        <h3>{props.nro}</h3>
        <div className={classes.ArtistName}>
            <h2>{props.artist}</h2>
            </div>
            <div className={classes.SongName}>
                <p>{props.trackName}</p>
            </div>
        </article>
    )
}

export default song;