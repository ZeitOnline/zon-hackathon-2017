import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { resetAudioSettings, updateAudioSettings } from 'app/actions/audioSettings';
import { AudioSettingSlider } from 'app/components';

class AudioSettings extends Component {
    static propTypes = {
        voice: PropTypes.string.isRequired,
        rate: PropTypes.number.isRequired,
        pitch: PropTypes.number.isRequired,
        volume: PropTypes.number.isRequired,
        voiceList: PropTypes.arrayOf(PropTypes.object).isRequired,
        resetAudioSettings: PropTypes.func.isRequired,
        updateAudioSettings: PropTypes.func.isRequired,
    }

    componentDidMount() {
        speechSynthesis.addEventListener('voiceschanged', this.props.resetAudioSettings);
    }

    render() {
        return (
            <details className="settings" open>
                <summary className="settings__summary">Settings</summary>
                <label htmlFor="name" className="settings__label">
                    <span>Voice</span>
                    <select
                        name="voice"
                        value={this.props.voice}
                        className="settings__voices"
                        onChange={this.handleVoiceChange}
                    >
                        { this.props.voiceList.map(voice => (
                            <option key={voice.voiceURI} value={voice.name}>
                                { voice.name } ({ voice.lang })
                            </option>
                        )) }
                    </select>
                </label>
                <AudioSettingSlider name="rate" value={this.props.rate} min={0.5} max={3.5} onChange={this.handleAudioSettingChange} />
                <AudioSettingSlider name="pitch" value={this.props.pitch} max={2} onChange={this.handleAudioSettingChange} />
                <AudioSettingSlider name="volume" value={this.props.volume} onChange={this.handleAudioSettingChange} />
                <button onClick={this.reset} className="settings__button">
                    Reset
                </button>
            </details>
        );
    }

    reset = () => {
        this.props.resetAudioSettings();
    }

    handleVoiceChange = (event) => {
        const { name, value } = event.target;

        this.props.updateAudioSettings({
            [name]: value,
        });
    }

    handleAudioSettingChange = (event) => {
        const { name, value } = event.target;

        this.props.updateAudioSettings({
            [name]: Number.parseFloat(value),
        });
    }
}

const mapStateToProps = ({ audioSettings }) => ({
    voice: audioSettings.voice,
    rate: audioSettings.rate,
    pitch: audioSettings.pitch,
    volume: audioSettings.volume,
    voiceList: audioSettings.voiceList,
});

const mapDispatchToProps = {
    resetAudioSettings,
    updateAudioSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioSettings);
