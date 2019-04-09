import React, { Component } from 'react';
import classes from './SpotifyPlayer.module.css';
import spotify from '../../../../../Utils/spotify';
import PlayButton from '@material-ui/icons/PlayArrow';
import PauseButton from '@material-ui/icons/Pause';
import RewindButton from '@material-ui/icons/SkipPrevious';
import { withStyles } from '@material-ui/core/styles';
import ProgressBar from './ProgressBar/ProgressBar';

class SpotifyPlayer extends Component {
    state = {
        playing: false,
        songPosition: 0 + ':' + 0,
        percentage: 0,
    }

    componentWillUnmount = () => {
        //stops playing the song if the component unmounts
        if (this.state.playing) {
            this.togglePlay();
        }
    }

    componentDidUpdate(Prevprops) {
        //Stops playing the song if song name changes and if the song is playing
        if (this.props.songName !== Prevprops.songName) {
            if (this.state.playing) {
                this.togglePlay();
            }
            //waits for the interval to have time to clear before setting state
            setTimeout(() => {
                this.setState({ songPosition: 0 + ':' + 0, percentage: 0 })
            }, 1500);
        }
    }

    calculateFiller = () => {
        let duration = this.props.songLengthInMS;
        let percent = duration / 100;
        let fill = setInterval(() => {
            this.setState({ percentage: this.state.percentage + .25 }, () => {
                if (this.state.percentage === 100 || !this.state.playing) {
                    clearInterval(fill)
                }
            })
        }, percent / 4)
    }

    calculatePosition = (minutes, seconds) => {
        this.calculateFiller();
        setTimeout(() => {
            let position;
            let count = setInterval(() => {
                seconds++;
                if (seconds >= 60) {
                    seconds = 0;
                    minutes++;
                }
                if (this.state.playing === false) {
                    clearInterval(count);
                }

                position = minutes + ':' + seconds;
                this.setState({ songPosition: position }, () => {
                    if (this.props.songLength === this.state.songPosition) {
                        this.setState({ playing: false })
                        clearInterval(count);
                    }
                })
            }, 1000);
        }, 1000)
    }
    resumePlay = (position_ms) => {
        spotify({
            method: 'PUT',
            url: 'me/player/play?device_id=' + sessionStorage.getItem('deviceId'),
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('SpotifyToken'),
            },
            data: {
                uris: [this.props.songUri],
                position_ms: position_ms,
            }
        }).then(response => {
            if (response.status === 204) {
                let minutes = this.state.songPosition.slice(0, 1);
                let seconds = this.state.songPosition.slice(this.state.songPosition.indexOf(':') + 1);
                this.setState({ playing: true }, () => {
                    this.calculatePosition(minutes, seconds);
                })
            }
        }).catch(error => {
            console.log(error)
        })
    }
    getSongPosition = () => {
        spotify({
            method: 'GET',
            url: 'me/player/currently-playing',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('SpotifyToken'),
            },
        }).then(response => {
            const position_ms = response.data.progress_ms;
            if (response.status === 200) {
                this.resumePlay(position_ms);
            }
        }).catch(error => {
            console.log(error);
        })
    }
    play = () => {
        spotify({
            method: 'PUT',
            url: 'me/player/play?device_id=' + sessionStorage.getItem('deviceId'),
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('SpotifyToken'),
            },
            data: {
                uris: [this.props.songUri],
            }
        }).then(response => {
            if (response.status === 204) {
                this.setState({ playing: true }, () => {
                    this.calculatePosition(0, 0);
                })
            }
        }).catch(error => {
            console.log(error)
        })
    }
    pause = () => {
        spotify({
            method: 'PUT',
            url: 'me/player/pause',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('SpotifyToken'),
            },
            params: {
                'device_id': sessionStorage.getItem('deviceId'),
            }
        }).then(response => {
            if (response.status === 204) {
                this.setState({ playing: false })
            }
        }).catch(error => {
            console.log(error)
        })
    }
    rewind = () => {

        if (this.state.playing) {
            this.pause();
            setTimeout(() => {
                this.calculatePosition(0, -1);
                this.setState({ percentage: 0 })
            }, 500)
        } else {
            this.calculatePosition(0, -1);
            this.setState({ percentage: 0 })
        }
    }
    togglePlay = () => {
        switch (true) {
            //if the song is paused this method resumes the song from the current position
            case (this.state.playing === false && this.state.songPosition !== 0 + ':' + 0):
                this.getSongPosition();
                break;
            case (!this.state.playing):
                this.play();
                break;
            case (this.state.playing):
                this.pause();
                break;
            default:
                break;
        }
    }
    render() {
        let Button = null
        if (this.state.playing) {
            Button = <PauseButton
                classes={{
                    root: this.props.classes.button,
                }}
                onClick={this.togglePlay} />
        } else {

            Button = <PlayButton
                classes={{
                    root: this.props.classes.button,
                }}
                onClick={this.togglePlay} />
        }
        return (
            <div className={classes.player}>
                <h2>{this.props.songName} by - {this.props.artist}</h2>
                <p>{this.state.songPosition} - {this.props.songLength}</p>
                <ProgressBar
                    percentage={this.state.percentage} />
                <RewindButton
                    classes={{
                        root: this.props.classes.button,
                    }}
                    onClick={this.rewind} />
                {Button}

            </div>
        )
    }
}
const styles = {
    button: {
        border: '1px solid #eee',
        borderRadius: '25px',
        height: '50px',
        width: 'auto',
        margin: '10px',
        color: '#eee',
        '&:hover': {
            border: '1px solid #866068',
            color: '#866068',
            cursor: 'pointer',
        }
    }
}
export default withStyles(styles)(SpotifyPlayer);