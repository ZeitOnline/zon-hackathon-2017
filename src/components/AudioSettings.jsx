import React, { Component } from 'react';
// import PropTypes from 'prop-types';

export default class AudioSettings extends Component {
    state = {
        voices: window.speechSynthesis.getVoices(),
        voice: '',
        rate: 1,
        pitch: 1,
    }

    render() {
        return (
            <aside>
                <pre>Settings</pre>
                <button
                    onClick={this.getVoicesList}
                >
                Load
                </button>
                <select name="voice" onChange={this.setFormValueToState}>
                    { this.state.voices.map(voice => (
                        <option key={voice.voiceURI}>
                            { voice.name } ({ voice.lang })
                        </option>
                    )) }
                </select>

                <div>
                    <label htmlFor="rate">Rate
                        <input name="rate" onChange={this.setFormValueToState} type="range" min="0.5" max="2" value={this.state.rate} step="0.1" id="rate" />
                    </label>
                </div>
                <div>
                    <label htmlFor="pitch">Pitch
                        <input name="pitch" onChange={this.setFormValueToState} type="range" min="0" max="2" value={this.state.pitch} step="0.1" id="pitch" />
                    </label>
                </div>

                <ul>
                    <li>- currentVoice: { this.state.voice }</li>
                    <li>- currentPitch: { this.state.pitch }</li>
                    <li>- currentRate: { this.state.rate }</li>
                </ul>
            </aside>
        );
    }

    getVoicesList = () => {
        this.setState({
            voices: window.speechSynthesis.getVoices(),
        });
    }

    setFormValueToState = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
}
