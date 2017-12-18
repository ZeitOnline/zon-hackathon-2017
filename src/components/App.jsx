import React, { Component } from 'react';

import { TeaserList, AudioSettings } from 'app/components';
import logo from 'app/svg/logo.svg';
import { defaultAudioSettings, getDefaultName } from 'app/utilities';

class App extends Component {
    state = {
        name: defaultAudioSettings.name,
        rate: defaultAudioSettings.rate,
        pitch: defaultAudioSettings.pitch,
        volume: defaultAudioSettings.volume,
    };

    componentDidMount() {
        speechSynthesis.addEventListener('voiceschanged', this.setDefaultName);
    }

    render() {
        return (
            <div>
                <header className="header">
                    <svg className="header_logo"><use xlinkHref={logo.url} /></svg>
                </header>
                <AudioSettings
                    {...this.state}
                    onChange={this.setAudioSetting}
                    reset={this.setDefaultAudioSettings}
                />
                <TeaserList {...this.state} />
            </div>
        );
    }

    setAudioSetting = (event) => {
        const { name, value } = event.target;

        speechSynthesis.cancel();
        this.setState({ [name]: value });
    };

    setDefaultAudioSettings = () => {
        speechSynthesis.cancel();
        this.setState({
            name: defaultAudioSettings.name,
            rate: defaultAudioSettings.rate,
            pitch: defaultAudioSettings.pitch,
            volume: defaultAudioSettings.volume,
        });
    };

    setDefaultName = () => {
        if (!defaultAudioSettings.name) {
            defaultAudioSettings.name = getDefaultName();

            this.setState({
                name: defaultAudioSettings.name,
            });
        }
    };
}

export default App;
