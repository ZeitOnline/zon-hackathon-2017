import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SpeechSynth } from 'app/utilities';

export default class PlayButton extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
    }

    render() {
        return (
            <button className="teaser__playbutton" onClick={toggleSpeech}>PLAY</button>
        );
    }

    toggleSpeech() {
        if (SpeechSynth.playing) {
            SpeechSynth.pause();
        } else {
            SpeechSynth.play(this.props.text);
        }
    }
}
