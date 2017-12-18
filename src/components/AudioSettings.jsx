import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AudioSetting } from 'app/components';
import { getVoices } from 'app/utilities';

export default class AudioSettings extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        rate: PropTypes.string.isRequired,
        pitch: PropTypes.string.isRequired,
        volume: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
    }

    state = {
        voices: getVoices(),
    };

    componentDidMount() {
        speechSynthesis.addEventListener('voiceschanged', this.setVoices);
    }

    render() {
        const { name, rate, pitch, volume, onChange, reset } = this.props;

        return (
            <details className="settings" open>
                <summary className="settings__summary">Settings</summary>
                <label htmlFor="name" className="settings__label">
                    <span>Voice</span>
                    <select
                        name="name"
                        value={name}
                        className="settings__voices"
                        onChange={onChange}
                    >
                        { this.state.voices.map(voice => (
                            <option key={voice.voiceURI} value={voice.name}>
                                { voice.name } ({ voice.lang })
                            </option>
                        )) }
                    </select>
                </label>
                <AudioSetting name="rate" value={rate} min={0.5} max={3.5} onChange={onChange} />
                <AudioSetting name="pitch" value={pitch} max={2} onChange={onChange} />
                <AudioSetting name="volume" value={volume} onChange={onChange} />
                <button onClick={reset} className="settings__button">
                    Default
                </button>
                <button onClick={this.mute} className="settings__button">
                    Mute
                </button>
            </details>
        );
    }

    setVoices = () => {
        if (!this.state.voices.length) {
            this.setState({
                voices: getVoices(),
            });
        }
    };

    mute = () => {
        speechSynthesis.cancel();
    };
}
