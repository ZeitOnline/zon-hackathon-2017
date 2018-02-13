import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TEASER } from 'app/shapes';

export default class Player extends Component {
    static propTypes = {
        teaser: PropTypes.shape(TEASER),
    };

    static defaultProps = {
        teaser: undefined,
    };

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            elapsedTime: 0,
        };
    }

    render() {
        return (
            <div className="player-wrapper">
                <div className="player">
                    <button className="player__playbutton">
                        {this.state.isPlaying ? <span className="player__pause" /> : '▶'}
                    </button>
                    <div className="player__track-info">
                        <h2 className="player__track">
                            <span className="player__kicker">{this.props.teaser && this.props.teaser.supertitle}</span>
                            <span className="player__title">{this.props.teaser && (this.props.teaser.teaser_title || this.props.teaser.title)}</span>
                        </h2>
                        <div className="player__progress">
                            <progress className="player__progress-bar" />
                            <time className="player__elapsed-time">{this.state.elapsedTime}</time>
                        </div>
                    </div>
                    <button className="player__playlist-button" title="Playlist anzeigen" />
                </div>
            </div>
        );
    }

    // getUtterance() {
    //     const { name, rate, pitch, volume } = this.props;
    //     const voices = speechSynthesis.getVoices();
    //     const utterance = new SpeechSynthesisUtterance(this.text);

    //     utterance.onend = this.stopPlaying;
    //     utterance.onerror = this.stopPlaying;
    //     utterance.onpause = this.stopPlaying;
    //     utterance.onresume = this.startPlaying;
    //     utterance.onstart = this.startPlaying;
    //     utterance.onboundary = this.setProgress;
    //     utterance.voice = voices.find(voice => voice.name === name);
    //     utterance.pitch = parseFloat(pitch);
    //     utterance.rate = parseFloat(rate);
    //     utterance.volume = parseFloat(volume);

    //     return utterance;
    // }

    // toggleSpeech = () => {
    //     const { uuid } = this.props.teaser;

    //     if (speechSynthesis.speaking && this.props.active) {
    //         if (speechSynthesis.paused) {
    //             speechSynthesis.resume();
    //         } else {
    //             speechSynthesis.pause();
    //         }
    //     } else {
    //         this.props.setActive(uuid);
    //         speechSynthesis.cancel();
    //         speechSynthesis.speak(this.getUtterance());
    //     }
    // };

    // startPlaying = () => {
    //     this.setState({ isPlaying: true });
    // };

    // stopPlaying = (event) => {
    //     const state = { isPlaying: false };

    //     if (event.type !== 'pause') {
    //         state.charIndex = 0;
    //         state.elapsedTime = 0;
    //     }

    //     this.setState(state);
    // };

    // setProgress = (event) => {
    //     const { elapsedTime } = event;
    //     this.setState({ elapsedTime });
    // };
}
