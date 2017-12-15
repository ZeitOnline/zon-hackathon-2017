import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Teaser } from 'app/components';
import { SpeechSynth } from 'app/utilities';
import { TEASER } from 'app/shapes';

export default class TeaserItem extends Component {
    static propTypes = {
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

    toggleSpeech = () => {
        const { uuid } = this.props.teaser;

        if (SpeechSynth.speaking && SpeechSynth.id === uuid) {
            if (SpeechSynth.paused) {
                SpeechSynth.resume();
            } else {
                SpeechSynth.pause();
            }
        } else {
            SpeechSynth.play(this.utterance, uuid);
        }

        this.setState(prevState => ({ isPlaying: !prevState.isPlaying }));
    };

    stopPlaying = () => {
        this.setState({ isPlaying: false });
    };
}
