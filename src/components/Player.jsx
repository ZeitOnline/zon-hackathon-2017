import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { play, pause, resetPlayer } from 'app/actions/player';
import { TEASER, AUDIO_SETTINGS } from 'app/shapes';
import { Timer } from 'app/components';

class Player extends Component {
    static propTypes = {
        teaserList: PropTypes.arrayOf(PropTypes.shape(TEASER)).isRequired,
        isPlaying: PropTypes.bool.isRequired,
        currentUUID: PropTypes.string.isRequired,
        play: PropTypes.func.isRequired,
        pause: PropTypes.func.isRequired,
        resetPlayer: PropTypes.func.isRequired,
        audioSettings: PropTypes.shape(AUDIO_SETTINGS).isRequired,
    };

    // TODO Move state to instance variables
    state = {
        currentTeaser: undefined,
        text: '',
        charIndex: 0,
        elapsedTime: 0,
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
        if (prevProps.currentUUID !== this.props.currentUUID) {
            this.startSpeech(this.getUtterance());
        }
    }

    render() {
        return (
            <div className="player-wrapper">
                <div className="player">
                    {this.renderPlayButton()}
                    <div className="player__track-info">
                        <h2 className="player__track">
                            <span className="player__kicker">
                                {this.state.currentTeaser &&
                                    this.state.currentTeaser.supertitle}
                            </span>
                            <span className="player__title">
                                {this.state.currentTeaser &&
                                    (this.state.currentTeaser.teaser_title ||
                                        this.state.currentTeaser.title)}
                            </span>
                        </h2>
                        <div className="player__progress" style={{ display: this.state.currentTeaser ? 'block' : 'none' }}>
                            <progress
                                className="player__progress-bar"
                                value={this.state.charIndex}
                                max={this.state.text.length}
                            />
                            <Timer
                                running={this.props.isPlaying}
                                reset={!this.state.elapsedTime || this.props.currentUUID === ''}
                                wordCount={this.getWordCount(this.state.text)}
                                readWords={this.getNoOfReadWords()}
                                speechRate={this.props.audioSettings.rate}
                            />
                        </div>
                    </div>
                    <button className="player__playlist-button" title="Playlist anzeigen" />
                </div>
            </div>
        );
    }

    renderPlayButton() {
        const disabled = this.state.currentTeaser ? '' : 'disabled';
        return (
            <button className="player__playbutton" onClick={this.handlePlayPause} disabled={disabled}>
                {this.props.isPlaying ? <span className="player__pause" /> : '▶'}
            </button>
        );
    }

    getTeaser = uuid =>
        this.props.teaserList.find(teaser => teaser.uuid === uuid)

    getText = (teaser) => {
        if (teaser) {
            return `${teaser.supertitle}: ${teaser.title || teaser.teaser_title}. ${teaser.body || teaser.teaser_text}`;
        }
        return '';
    }

    getNoOfReadWords = () => {
        const cleanedText = this.state.text.trim().replace(/\s+/, ' ');
        const lastIndex = cleanedText.lastIndexOf(' ', this.state.charIndex);
        const readStringPart = this.state.text.substring(0, lastIndex + 1);

        return this.getWordCount(readStringPart);
    }

    getWordCount = text => text.split(' ').length

    handlePlayPause = () => {
        if (this.props.isPlaying) {
            this.props.pause();
            this.pauseSpeech();
        } else {
            this.props.play(this.props.currentUUID);
            this.resumeSpeech();
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
        utterance.onend = this.stopSpeech;
        return utterance;
    }

    startSpeech = () => {
        speechSynthesis.cancel();
        speechSynthesis.speak(this.getUtterance());
    }

    resumeSpeech = () => {
        if (speechSynthesis.speaking && speechSynthesis.paused) {
            speechSynthesis.resume();
        }
    }

    pauseSpeech = () => {
        if (speechSynthesis.speaking) {
            speechSynthesis.pause();
        }
    }

    stopSpeech = () => {
        speechSynthesis.cancel();
        this.props.resetPlayer();
    }

    setProgress = (event) => {
        const { charIndex, elapsedTime } = event;
        this.setState({
            charIndex,
            elapsedTime,
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
    resetPlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
