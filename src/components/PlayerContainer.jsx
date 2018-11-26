import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';

import { TEASER, AUDIO_SETTINGS } from 'app/shapes';
import { play, pause, resetPlayer } from 'app/actions/player';
import { Player } from 'app/components';

class PlayerContainer extends Component {
    static propTypes = {
        isPlaying: PropTypes.bool.isRequired,
        currentUUID: PropTypes.string,
        currentTeaser: PropTypes.shape(TEASER),
        play: PropTypes.func.isRequired,
        pause: PropTypes.func.isRequired,
        resetPlayer: PropTypes.func.isRequired,
        audioSettings: PropTypes.shape(AUDIO_SETTINGS).isRequired,
    };

    static defaultProps = {
        currentUUID: null,
        currentTeaser: null,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentUUID !== prevState.currentUUID) {
            return {
                currentUUID: nextProps.currentUUID,
                remainingText: nextProps.currentTeaser && nextProps.currentTeaser.playerText,
                charIndex: 0,
                elapsedTime: 0,
                readChars: 0,
            };
        }

        return null;
    }

    constructor(props) {
        super(props);

        this.currentUtterance = null;
        this.state = {
            currentUUID: null,  // eslint-disable-line
            charIndex: 0,
            readChars: 0,
            elapsedTime: 0,
            remainingText: null,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        // CASES
        //
        // 1. Start new Track
        //      isPlaying: false, currentUUID: null
        // --> isPlaying: true, currentUUID: A
        //
        // 2. Resume current track
        //      isPlaying: false, currentUUID: A
        // --> isPlaying: true, currentUUID: A
        //
        // 3. Pause current track
        //      isPlaying: true, currentUUID: A
        // --> isPlaying: false, currentUUID: A
        //
        // 4. Interrupt current and start new track
        //      isPlaying: true, currentUUID: A
        // --> isPlaying: true, currentUUID: B
        //      isPlaying: true, currentUUID: A
        // --> isPlaying: true, currentUUID: A
        //
        // 5. Track ended (see onend Event of utterance!)
        //      isPlaying: true, currentUUID: A
        // --> isPlaying: false, currentUUID: null

        if (this.props.isPlaying !== prevProps.isPlaying) {
            if (this.props.isPlaying) {
                if (this.props.currentUUID &&
                    this.props.currentUUID === prevProps.currentUUID) {
                    // 2. Resume current track
                    this.resumeSpeech();
                } else {
                    // 1. Start new Track
                    this.startSpeech();
                }
            } else {
                // 3. Pause current track
                this.pauseSpeech();
            }
        } else if (this.props.isPlaying) {
            // 4. Interrupt current and start new track
            if (this.props.currentUUID !== prevProps.currentUUID
                || this.state.remainingText !== prevState.remainingText) {
                this.startSpeech();
            } else if (this.props.audioSettings !== prevProps.audioSettings) {
                this.debouncedSettingsUpdate();
            }
        }
    }

    render() {
        const {
            currentTeaser,
            isPlaying,
        } = this.props;

        const {
            elapsedTime,
            readChars,
            charIndex,
            remainingText,
        } = this.state;

        return (
            <Player
                currentTeaser={currentTeaser}
                isPlaying={isPlaying}
                handlePlayPause={this.handlePlayPause}
                charIndex={charIndex}
                readChars={readChars}
                elapsedTime={elapsedTime}
                remainingText={remainingText}
            />
        );
    }

    handlePlayPause = () => {
        if (this.props.isPlaying) {
            this.props.pause();
            this.pauseSpeech();
        } else {
            this.props.play(this.props.currentUUID);
            this.resumeSpeech();
        }
    }

    getUtterance(text) {
        const {
            voice,
            rate,
            pitch,
            volume,
            voiceList,
        } = this.props.audioSettings;
        const utterance = new SpeechSynthesisUtterance(text);

        utterance.onstart = this.onSpeechStart; // TODO ?
        utterance.voice = voiceList.find(v => v.name === voice);
        utterance.pitch = pitch;
        utterance.rate = rate;
        utterance.volume = volume;
        utterance.onboundary = this.setProgress;
        utterance.onend = this.onSpeechEnd;
        return utterance;
    }

    debouncedSettingsUpdate = debounce(this.updateSettingsAndResume, 250);

    updateSettingsAndResume() {
        if (!this.state.remainingText) {
            // Avoids problems when changing audio settings
            // shortly before running track ends.
            return;
        }

        this.setState(prevState => ({
            remainingText: prevState.remainingText.slice(prevState.charIndex),
        }));
    }

    startSpeech = () => {
        if (this.currentUtterance) {
            // Avoid triggering onSpeechEnd Event that is triggered
            // by speechSynthesis.cancel()
            this.currentUtterance.onend = null;
        }
        speechSynthesis.cancel();
        this.currentUtterance = this.getUtterance(this.state.remainingText);
        this.props.play(this.props.currentUUID);
        speechSynthesis.speak(this.currentUtterance);
    }

    resumeSpeech = () => {
        if (speechSynthesis.speaking && speechSynthesis.paused) {
            speechSynthesis.resume();
        } else {
            // Assuming audioSettings have changed, which means
            // a new utterance must be played.
            this.startSpeech();
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

    onSpeechStart = () => {
        this.setState({
            charIndex: 0,
        });
    }

    setProgress = (event) => {
        const { charIndex, elapsedTime } = event;

        this.setState(prevState => ({
            charIndex,
            elapsedTime,
            readChars: prevState.readChars + (charIndex - prevState.charIndex),
        }));
    };
}

const mapStateToProps = ({ player, teasers, audioSettings }) => {
    const { isPlaying, currentUUID } = player;
    const currentTeaser = currentUUID
        ? teasers.teaserList.find(({ uuid }) => uuid === currentUUID)
        : null;

    return {
        isPlaying,
        currentUUID,
        currentTeaser,
        audioSettings,
    };
};

const mapDispatchToProps = {
    play,
    pause,
    resetPlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
