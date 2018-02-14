import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { play, pause } from 'app/actions/player';
import { TEASER, AUDIO_SETTINGS } from 'app/shapes';

class Player extends Component {
    static propTypes = {
        teaserList: PropTypes.arrayOf(PropTypes.shape(TEASER)).isRequired,
        isPlaying: PropTypes.bool.isRequired,
        currentUUID: PropTypes.string.isRequired,
        play: PropTypes.func.isRequired,
        pause: PropTypes.func.isRequired,
        audioSettings: PropTypes.shape(AUDIO_SETTINGS).isRequired,
    };

    state = {
        currentTeaser: undefined,
        text: '',
        charIndex: 0,
    }

    componentWillReceiveProps(nextProps) {
        const currentTeaser = this.getTeaser(nextProps.currentUUID);
        const text = this.getText(currentTeaser);
        this.setState({
            currentTeaser,
            text,
        });
    }

    componentDidUpdate(prevProps) {
        console.log('update');
        if (prevProps.currentUUID !== this.props.currentUUID) {
            this.startSpeech(this.getUtterance());
        }
    }

    render() {
        return (
            <div className="player-wrapper">
                <div className="player">
                    <button className="player__playbutton" onClick={this.handlePlayPause}>
                        {this.props.isPlaying ? <span className="player__pause" /> : '▶'}
                    </button>
                    <div className="player__track-info">
                        <h2 className="player__track">
                            <span className="player__kicker">{this.state.currentTeaser && this.state.currentTeaser.supertitle}</span>
                            <span className="player__title">{this.state.currentTeaser && (this.state.currentTeaser.teaser_title || this.state.currentTeaser.title)}</span>
                        </h2>
                        <div className="player__progress">
                            <progress className="player__progress-bar" value={this.state.charIndex} max={this.state.text.length} />
                            <time className="player__elapsed-time">{this.state.elapsedTime}</time>
                        </div>
                    </div>
                    <button className="player__playlist-button" title="Playlist anzeigen" />
                </div>
            </div>
        );
    }

    getTeaser = uuid =>
        this.props.teaserList.find(teaser => teaser.uuid === uuid)

    getText = (teaser) => {
        if (teaser) {
            return `${teaser.supertitle}:
            ${teaser.title || teaser.teaser_title}.
            ${teaser.body || teaser.teaser_text}`;
        }
        return '';
    }

    handlePlayPause = () => {
        if (this.props.isPlaying) {
            this.props.pause();
            this.stopSpeech();
        } else {
            this.props.play(this.props.currentUUID);
            this.startSpeech();
        }
    }

    getUtterance() {
        const {
            voice,
            rate,
            pitch,
            volume,
            voiceList,
        } = this.props.audioSettings;
        const utterance = new SpeechSynthesisUtterance(this.state.text);

        utterance.voice = voiceList.find(v => v.name === voice);
        utterance.pitch = pitch;
        utterance.rate = rate;
        utterance.volume = volume;
        utterance.onboundary = this.setProgress;
        return utterance;
    }

    startSpeech = (utterance) => {
        if (utterance) {
            speechSynthesis.cancel();
            speechSynthesis.speak(utterance);
        } else if (speechSynthesis.speaking && speechSynthesis.paused) {
            speechSynthesis.resume();
        }
    }

    stopSpeech = () => {
        if (speechSynthesis.speaking) {
            speechSynthesis.pause();
        }
    }

    setProgress = (event) => {
        const { charIndex } = event;
        this.setState({
            charIndex,
        });
    };
}

const mapStateToProps = ({ player, teasers, audioSettings }) => ({
    isPlaying: player.isPlaying,
    currentUUID: player.currentUUID,
    teaserList: teasers.teaserList,
    audioSettings,
});

const mapDispatchToProps = {
    play,
    pause,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
