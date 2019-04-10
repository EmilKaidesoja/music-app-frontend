import React, { Component } from 'react';
import spotify from '../../../../Utils/spotify';
import SpotifyPLayer from './SpotifyPlayer/SpotifyPlayer';
import { Link } from 'react-router-dom';
import RelatedArtist from './RelatedArtist';
import classes from './SpotifySection.module.css';

class SpotifyFullSong extends Component {
    state = {}
    componentDidMount = () => {
        this.getRelatedArtists();
    }
    getRelatedArtists = () => {
        spotify({
            method: 'get',
            url: 'artists/' + this.props.artistId + '/related-artists',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('SpotifyToken'),
            },
        }).then(response => {
            console.log(response)
            const artists = response.data.artists;
            const mappedArtists = artists.map(artist => {
                return {
                    ...artist,
                }
            })
            this.setState({ relatedArtists: mappedArtists })
        }).catch(error => {
            console.log(error)
        })
    }
    render() {
        let relatedArtists = null
        if (this.state.relatedArtists) {
            relatedArtists = (
                this.state.relatedArtists.slice(0, 6).map(artist => {
                    return (
                        <Link to={'/search/' + artist.name}>
                            <RelatedArtist
                                artist={artist.name}
                                image={artist.images[0].url}
                            />
                        </Link>

                    )
                }
                ))
        }
        return (
            <div>
                <SpotifyPLayer
                    songUri={this.props.songUri}
                    songName={this.props.songName}
                    artist={this.props.artist}
                    songLength={this.props.songLength}
                    songLengthInMS={this.props.songLengthInMS} />

                <h3>You should check out these artists as well!</h3>
                <div className={classes.relatedArtists}>
                    {relatedArtists}
                </div>
            </div>
        )
    }
}
export default SpotifyFullSong;