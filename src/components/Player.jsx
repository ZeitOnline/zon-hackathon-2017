import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { play, pause, resetPlayer } from 'app/actions/player';
import { TEASER, AUDIO_SETTINGS } from 'app/shapes';
import { Timer, TimeEstimateDynamic, PlayButton, PlaylistButton, SettingsButton } from 'app/components';
import { countWords } from 'app/utilities';

class Player extends Component {
    static propTypes = {
        teaserList: PropTypes.arrayOf(PropTypes.shape(TEASER)).isRequired,
        isPlaying: PropTypes.bool.isRequired,
        currentUUID: PropTypes.string,
        play: PropTypes.func.isRequired,
        pause: PropTypes.func.isRequired,
        resetPlayer: PropTypes.func.isRequired,
        audioSettings: PropTypes.shape(AUDIO_SETTINGS).isRequired,
    };

    static defaultProps = {
        currentUUID: null,
    }

    constructor(props) {
        super(props);

        this.currentUtterance = null;
        this.state = {
            currentTeaser: null,
            charIndex: 0,
            elapsedTime: 0,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUUID !== this.props.currentUUID) {
            const currentTeaser = this.getTeaser(nextProps.currentUUID);
            this.setState({ currentTeaser });
        }
    }

    componentDidUpdate(prevProps) {
        // if (this.props.currentUUID &&
        //     (prevProps.currentUUID !== this.props.currentUUID)) {
        //     }

        if (this.props.isPlaying !== prevProps.isPlaying) {
            if (this.props.isPlaying) {
                if (this.props.currentUUID &&
                    this.props.currentUUID === prevProps.currentUUID) {
                    this.resumeSpeech();
                } else {
                    this.startSpeech();
                }
            } else {
                this.pauseSpeech();
            }
        }
    }

    render() {
        const hasTrack = !!this.state.currentTeaser;

        return (
            <div className="player-wrapper">
                <div className={`player ${hasTrack ? '' : 'player--inactive'}`}>
                    <PlayButton
                        isPlaying={this.props.isPlaying}
                        onClick={this.handlePlayPause}
                        disabled={!hasTrack}
                    />
                    {hasTrack && this.renderTrackInfo()}
                    <div className="player__buttons">
                        <PlaylistButton />
                        <SettingsButton />
                    </div>
                </div>
            </div>
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
                        reset={!this.state.elapsedTime}
                    />
                    <progress
                        className="player__progress-bar"
                        value={this.state.charIndex}
                        max={this.state.currentTeaser.playerText.length}
                    />
                    <TimeEstimateDynamic
                        wordCount={this.state.currentTeaser.wordCount}
                        readWords={countWords(
                            this.state.currentTeaser.playerText,
                            this.state.charIndex,
                        )}
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
        utterance.onend = this.onSpeechEnd;
        return utterance;
    }

    startSpeech = () => {
        if (this.currentUtterance) {
            // interrupting current speech, avoid triggering onSpeechEnd
            // that is triggered on the current utterance after
            // speechSynthesis.cancel()
            this.currentUtterance.onend = null;
        }
        speechSynthesis.cancel();
        this.setState({ elapsedTime: 0 });
        this.props.play(this.state.currentTeaser.uuid);
        this.currentUtterance = this.getUtterance();
        speechSynthesis.speak(this.currentUtterance);
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

    onSpeechEnd = () => {
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
