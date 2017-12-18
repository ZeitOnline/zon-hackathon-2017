import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Teaser } from 'app/components';
import { SpeechSynth } from 'app/utilities';
import { TEASER } from 'app/shapes';

export default class TeaserItem extends Component {
    static propTypes = {
        lang: PropTypes.string.isRequired,
        rate: PropTypes.string.isRequired,
        pitch: PropTypes.string.isRequired,
        volume: PropTypes.string.isRequired,
        teaser: PropTypes.shape(TEASER).isRequired,
    };

    constructor(props) {
        super(props);

        const { teaser } = this.props;
        const text = `${teaser.supertitle}:
        ${teaser.title || teaser.teaser_title}.
        ${teaser.body || teaser.teaser_text}`;

        this.utterance = new SpeechSynthesisUtterance(text);
        this.utterance.onend = this.stopPlaying;
        this.utterance.onerror = this.stopPlaying;
        this.utterance.onpause = this.stopPlaying;
        this.utterance.onresume = this.startPlaying;
        this.utterance.onstart = this.startPlaying;

        this.state = {
            isPlaying: false,
        };
    }

    render() {
        return (
            <Teaser
                teaser={this.props.teaser}
                toggleSpeech={this.toggleSpeech}
                isPlaying={this.state.isPlaying}
            />
        );
    }

    updateUtterance() {
        const { lang, rate, pitch, volume } = this.props;

        this.utterance.lang = lang;
        this.utterance.pitch = parseFloat(pitch);
        this.utterance.rate = parseFloat(rate);
        this.utterance.volume = parseFloat(volume);
    }

    toggleSpeech = () => {
        const { uuid } = this.props.teaser;

        if (SpeechSynth.speaking && SpeechSynth.id === uuid) {
            if (SpeechSynth.paused) {
                SpeechSynth.resume();
            } else {
                SpeechSynth.pause();
            }
        } else {
            this.updateUtterance();
            SpeechSynth.play(this.utterance, uuid);
        }
    };

    startPlaying = () => {
        this.setState({ isPlaying: true });
    };

    stopPlaying = () => {
        this.setState({ isPlaying: false });
    };
}
