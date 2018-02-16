import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { play, pause, resetPlayer } from 'app/actions/player';
import { TEASER, AUDIO_SETTINGS } from 'app/shapes';
import { Timer, TimeEstimate } from 'app/components';
import { countWords } from 'app/utilities';

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

    state = {
        currentTeaser: undefined,
        charIndex: 0,
        elapsedTime: 0,
    }

    componentWillReceiveProps({ currentUUID }) {
        const currentTeaser = this.getTeaser(currentUUID);
        this.setState({ currentTeaser });
    }

    componentDidUpdate({ currentUUID }) {
        if (this.props.currentUUID.length &&
            (currentUUID !== this.props.currentUUID)) {
            this.startSpeech(this.getUtterance());
        }
    }

    render() {
        const hasTrack = !!this.state.currentTeaser;

        return (
            <div className="player-wrapper">
                <div className={`player ${hasTrack ? '' : 'player--inactive'}`}>
                    {this.renderPlayButton(hasTrack)}
                    {hasTrack && this.renderTrackInfo()}
                    <button className="player__playlist-button" title="Playlist anzeigen" />
                </div>
            </div>
        );
    }

    renderPlayButton(hasTrack) {
        const disabled = hasTrack ? '' : 'disabled';

        return (
            <button className="player__playbutton" onClick={this.handlePlayPause} disabled={disabled}>
                {this.props.isPlaying ? <span className="player__pause" /> : '▶'}
            </button>
        );
    }

    renderTrackInfo() {
        return (
            <div className="player__track-info">
                <h2 className="player__track">
                    <span className="player__kicker">
                        {this.state.currentTeaser.supertitle}
                    </span>
                    <span className="player__title">
                        {this.state.currentTeaser.title}
                    </span>
                </h2>
                <div className="player__progress">
                    <Timer
                        running={this.props.isPlaying}
                        reset={!this.state.elapsedTime || this.props.currentUUID === ''}
                    />
                    <progress
                        className="player__progress-bar"
                        value={this.state.charIndex}
                        max={this.state.currentTeaser.playerText.length}
                    />
                    <TimeEstimate
                        wordCount={this.state.currentTeaser.wordCount}
                        readWords={countWords(
                            this.state.currentTeaser.playerText,
                            this.state.charIndex,
                        )}
                        speechRate={this.props.audioSettings.rate}
                        running={this.props.isPlaying}
                    />
                </div>
            </div>
        );
    }

    getTeaser = uuid =>
        this.props.teaserList.find(teaser => teaser.uuid === uuid)

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
        const { playerText } = this.state.currentTeaser;
        const utterance = new SpeechSynthesisUtterance(playerText);

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
