import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Teaser } from 'app/components';
import { TEASER } from 'app/shapes';

export default class TeaserItem extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        rate: PropTypes.string.isRequired,
        pitch: PropTypes.string.isRequired,
        volume: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired,
        teaser: PropTypes.shape(TEASER).isRequired,
        setActive: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        const { teaser } = this.props;
        this.text = `${teaser.supertitle}:
        ${teaser.title || teaser.teaser_title}.
        ${teaser.body || teaser.teaser_text}`;

        this.state = {
            isPlaying: false,
            charIndex: 0,
        };
    }

    render() {
        return (
            <Teaser
                teaser={this.props.teaser}
                charIndex={this.state.charIndex}
                length={this.text.length}
                toggleSpeech={this.toggleSpeech}
                isPlaying={this.state.isPlaying}
            />
        );
    }

    setUtterance() {
        const { name, rate, pitch, volume } = this.props;
        const voices = speechSynthesis.getVoices();

        this.utterance = new SpeechSynthesisUtterance(this.text);
        this.utterance.onend = this.stopPlaying;
        this.utterance.onerror = this.stopPlaying;
        this.utterance.onpause = this.stopPlaying;
        this.utterance.onresume = this.startPlaying;
        this.utterance.onstart = this.startPlaying;
        this.utterance.onboundary = this.setProgress;
        this.utterance.voice = voices.find(voice => voice.name === name);
        this.utterance.pitch = parseFloat(pitch);
        this.utterance.rate = parseFloat(rate);
        this.utterance.volume = parseFloat(volume);
    }

    toggleSpeech = () => {
        const { uuid } = this.props.teaser;

        if (speechSynthesis.speaking && this.props.active) {
            if (speechSynthesis.paused) {
                speechSynthesis.resume();
            } else {
                speechSynthesis.pause();
            }
        } else {
            this.setUtterance();
            this.props.setActive(uuid);
            speechSynthesis.cancel();
            speechSynthesis.speak(this.utterance);
        }
    };

    startPlaying = () => {
        this.setState({ isPlaying: true });
    };

    stopPlaying = () => {
        this.setState({ isPlaying: false });
    };

    setProgress = (event) => {
        this.setState({ charIndex: event.charIndex });
    };
}
