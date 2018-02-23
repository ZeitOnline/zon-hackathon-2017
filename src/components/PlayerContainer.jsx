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
        this.debouncedSettingsUpdate = debounce(() => {
            this.updateSettingsAndResume();
        }, 250);

        this.state = {
            currentTeaser: null,
            charIndex: 0,
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
        // Start new Track
        // 1.   isPlaying: false, currentUUID: null
        // --> isPlaying: true, currentUUID: A
        //
        // Resume current track
        // 2.   isPlaying: false, currentUUID: A
        // --> isPlaying: true, currentUUID: A
        //
        // Pause current track
        // 3.   isPlaying: true, currentUUID: A
        // --> isPlaying: false, currentUUID: A
        //
        // Interrupt and start new track
        // 4.   isPlaying: true, currentUUID: A
        // --> isPlaying: true, currentUUID: B
        //
        // Track ended (see onend Event of utterance)
        // 5.   isPlaying: true, currentUUID: A
        // --> isPlaying: false, currentUUID: null


        if (this.props.isPlaying !== prevProps.isPlaying) {
            if (this.props.isPlaying) {
                if (this.props.currentUUID &&
                    this.props.currentUUID === prevProps.currentUUID) {
                    // 2.
                    this.resumeSpeech();
                } else {
                    // 1.
                    this.startSpeech();
                }
            } else {
                // 3.
                this.pauseSpeech();
            }
        } else if (this.props.isPlaying &&
            this.props.currentUUID !== prevProps.currentUUID) {
            // 4.
            this.startSpeech();
        }
    }

    render() {
        const {
            isPlaying,
        } = this.props;

        const {
            charIndex,
            elapsedTime,
            currentTeaser,
        } = this.state;

        return (
            <Player
                currentTeaser={currentTeaser}
                isPlaying={isPlaying}
                handlePlayPause={this.handlePlayPause}
                charIndex={charIndex}
                elapsedTime={elapsedTime}
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

        utterance.voice = voiceList.find(v => v.name === voice);
        utterance.pitch = pitch;
        utterance.rate = rate;
        utterance.volume = volume;
        utterance.onboundary = this.setProgress;
        utterance.onend = this.onSpeechEnd;
        return utterance;
    }

    updateSettingsAndResume = () => {
        const lastSpace = this.state.currentTeaser.playerText.lastIndexOf(' ', this.state.charIndex);
        const remainingText = this.state.remainingText.slice(lastSpace);
        // const textIndex = this.state.currentTeaser.playerText.indexOf(this.stat);
        // const remainingText = this.state.currentTeaser.playerText.slice(textIndex);

        this.setState({
            remainingText,
        }, () => {
            this.currentUtterance = this.getUtterance(this.state.remainingText);
        });
    }

    startSpeech = () => {
        if (this.currentUtterance) {
            // interrupting current speech, avoid triggering onSpeechEnd
            // that is triggered on the current utterance after
            // speechSynthesis.cancel()
            this.currentUtterance.onend = null;
        }
        speechSynthesis.cancel();
        // this.setState({ elapsedTime: 0 });
        this.props.play(this.state.currentTeaser.uuid);
        this.currentUtterance = this.getUtterance(this.state.remainingText);
        console.log(this.currentUtterance);
        speechSynthesis.speak(this.currentUtterance);
    }

    resumeSpeech = () => {
        if (speechSynthesis.speaking && speechSynthesis.paused) {
            speechSynthesis.resume();
        } else if (this.state.currentTeaser) {
            // Start a new speech when utterance changed
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

    setProgress = (event) => {
        const { charIndex, elapsedTime } = event;
        console.log(charIndex, elapsedTime);
        this.setState({
            charIndex,
            elapsedTime: elapsedTime + this.state.elapsedTimeTotal,
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
