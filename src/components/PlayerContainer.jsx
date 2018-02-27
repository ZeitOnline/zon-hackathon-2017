import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';

import { TEASER, AUDIO_SETTINGS } from 'app/shapes';
import { play, pause, resetPlayer } from 'app/actions/player';
import { Player } from 'app/components';

class PlayerContainer extends Component {
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
            readChars: 0,
            elapsedTime: 0,
            remainingText: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUUID !== this.props.currentUUID) {
            const currentTeaser = this.getTeaser(nextProps.currentUUID);

            this.setState({
                currentTeaser,
                remainingText: currentTeaser && currentTeaser.playerText,
                charIndex: 0,
                elapsedTime: 0,
                readChars: 0,
            });
        }

        if (nextProps.audioSettings !== this.props.audioSettings) {
            if (this.state.remainingText) {
                this.debouncedSettingsUpdate();
            }
        }
    }

    componentDidUpdate(prevProps) {
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
        //
        // [5.] Track ended (see onend Event of utterance!)
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
        } else if (this.props.isPlaying &&
            this.props.currentUUID !== prevProps.currentUUID) {
            // 4. Interrupt current and start new track
            this.startSpeech();
        }
    }

    render() {
        const {
            isPlaying,
        } = this.props;

        const {
            elapsedTime,
            currentTeaser,
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

    debouncedSettingsUpdate = debounce(() => {
        this.updateSettingsAndResume();
    }, 250);

    updateSettingsAndResume = () => {
        if (!this.state.remainingText) {
            // Avoids problems when changing audio settings
            // shortly before running track ends.
            return;
        }
        const remainingText = this.state.remainingText.slice(this.state.charIndex);

        this.setState({
            remainingText,
        }, () => {
            if (this.props.isPlaying) {
                this.startSpeech();
            } else {
                this.currentUtterance.onend = null;
                speechSynthesis.cancel();
            }
        });
    }

    startSpeech = () => {
        if (this.currentUtterance) {
            // Avoid triggering onSpeechEnd Event that is triggered
            // by speechSynthesis.cancel()
            this.currentUtterance.onend = null;
        }
        speechSynthesis.cancel();
        this.currentUtterance = this.getUtterance(this.state.remainingText);
        this.props.play(this.state.currentTeaser.uuid);
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
        const readSinceLastEvent = charIndex - this.state.charIndex;

        this.setState({
            charIndex,
            readChars: this.state.readChars + readSinceLastEvent,
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
