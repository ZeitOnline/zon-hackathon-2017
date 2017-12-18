import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { AudioSetting } from 'app/components';

const utterance = new SpeechSynthesisUtterance('');

export default class AudioSettings extends Component {
    state = {
        voices: speechSynthesis.getVoices(),
        lang: utterance.lang,
        rate: utterance.rate,
        pitch: utterance.pitch,
        volume: utterance.volume,
    };

    componentDidMount() {
        speechSynthesis.onvoiceschanged = this.setVoices;
    }

    render() {
        return (
            <details className="settings" open>
                <summary>Settings</summary>
                <label htmlFor="lang" className="settings__label">
                    <span>Voice</span>
                    <select
                        name="lang"
                        value={this.state.lang}
                        className="settings__voices"
                        onChange={this.setAudioSettings}
                    >
                        { this.state.voices.map(voice => (
                            <option key={voice.voiceURI} value={voice.lang}>
                                { voice.name } ({ voice.lang })
                                { voice.default && ' [default]'}
                            </option>
                        )) }
                    </select>
                </label>
                <AudioSetting name="rate" value={this.state.rate} min="0.1" max="10" onChange={this.setAudioSettings} />
                <AudioSetting name="pitch" value={this.state.pitch} max="2" onChange={this.setAudioSettings} />
                <AudioSetting name="volume" value={this.state.volume} onChange={this.setAudioSettings} />
            </details>
        );
    }

    setVoices = () => {
        this.setState({
            voices: speechSynthesis.getVoices(),
        });
    }

    setAudioSettings = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }
}
