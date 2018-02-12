import React, { Component } from 'react';

import { TeaserList, AudioSettings, Player } from 'app/components';
import logo from 'app/svg/logo.svg';
import { defaultAudioSettings, getDefaultName } from 'app/utilities';

class App extends Component {
    state = {
        name: defaultAudioSettings.name,
        rate: defaultAudioSettings.rate,
        pitch: defaultAudioSettings.pitch,
        volume: defaultAudioSettings.volume,
        currentTeaser: undefined,
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
                    reset={this.resetAudioSettings}
                />
                <TeaserList />
                <Player
                    {...this.state}
                />
            </div>
        );
    }

    setAudioSetting = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };

    resetAudioSettings = () => {
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
