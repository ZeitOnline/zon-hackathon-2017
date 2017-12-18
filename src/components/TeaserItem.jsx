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

    componentDidUpdate(prevProps) {
        const props = ['name', 'rate', 'pitch', 'volume'];
        const { speaking, paused } = speechSynthesis;

        if (props.some(key => prevProps[key] !== this.props[key])) {
            if (speaking && this.props.active) {
                speechSynthesis.cancel();

                if (!paused) {
                    speechSynthesis.speak(this.getUtterance());
                }
            }
        }
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

    getUtterance() {
        const { name, rate, pitch, volume } = this.props;
        const voices = speechSynthesis.getVoices();
        const utterance = new SpeechSynthesisUtterance(this.text);

        utterance.onend = this.stopPlaying;
        utterance.onerror = this.stopPlaying;
        utterance.onpause = this.stopPlaying;
        utterance.onresume = this.startPlaying;
        utterance.onstart = this.startPlaying;
        utterance.onboundary = this.setProgress;
        utterance.voice = voices.find(voice => voice.name === name);
        utterance.pitch = parseFloat(pitch);
        utterance.rate = parseFloat(rate);
        utterance.volume = parseFloat(volume);

        return utterance;
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
            this.props.setActive(uuid);
            speechSynthesis.cancel();
            speechSynthesis.speak(this.getUtterance());
        }
    };

    startPlaying = () => {
        this.setState({ isPlaying: true });
    };

    stopPlaying = (event) => {
        const state = { isPlaying: false };

        if (event.type !== 'pause') {
            state.charIndex = 0;
        }

        this.setState(state);
    };

    setProgress = (event) => {
        this.setState({ charIndex: event.charIndex });
    };
}
