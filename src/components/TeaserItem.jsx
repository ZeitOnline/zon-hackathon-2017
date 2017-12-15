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
                isPlaying={this.state.isPlaying}
            />
        );
    }

    // concatText() {
    //     const { teaser } = this.props;
    // }
    toggleSpeech = () => {
        const { teaser } = this.props;
        const text = `${teaser.supertitle} ${teaser.title || teaser.teaser_title} ${teaser.teaser_text}`;

        if (SpeechSynth.speaking) {
            if (this.state.isPaused) {
                SpeechSynth.resume();
                this.setState({ isPaused: false, isPlaying: true });
            } else if (this.state.isPlaying) {
                SpeechSynth.pause();
                this.setState({ isPaused: true, isPlaying: false });
            } else {
                SpeechSynth.cancel();
                SpeechSynth.play(text);
                this.setState({ isPaused: false, isPlaying: true });
            }
        } else {
            SpeechSynth.play(text);
            this.setState({ isPlaying: true });
        }
    }
}
