import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Teaser } from 'app/components';
import { SpeechSynth } from 'app/utilities';
import { TEASER } from 'app/shapes';

export default class TeaserItem extends Component {
    static propTypes = {
        teaser: PropTypes.shape(TEASER).isRequired,
    };

    state = {
        isPlaying: false,
        isPaused: false,
    }

    render() {
        return (
            <Teaser
                teaser={this.props.teaser}
                toggleSpeech={this.toggleSpeech}
            />
        );
    }

    // concatText() {
    //     const { teaser } = this.props;
    // }
    toggleSpeech = () => {
        const { teaser } = this.props;
        const text = `${teaser.supertitle} ${teaser.title || teaser.teaser_title} ${teaser.teaser_text}`;
        if (SpeechSynth.playing) { // Text wird gesprochen
            if (this.state.isPlaying) { // DIESER Text wird gesprochen
                SpeechSynth.pause();
                this.setState({ isPaused: true, isPlaying: false });
            } else { // EIN ANDERER Text wird gesprochen
                SpeechSynth.cancel();
                SpeechSynth.play(text); // Spiele DIESEN Text
            }
        } else if (this.state.isPaused) {
            SpeechSynth.resume(); // DIESER Text ist pausiert
            this.setState({ isPaused: false, isPlaying: true });
        } else {
            SpeechSynth.play(text);
            this.setState({ isPlaying: true });
        }
    }
}
