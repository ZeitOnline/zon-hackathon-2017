import React, { Component } from 'react';

import { TeaserList, AudioSettings } from 'app/components';
import logo from 'app/svg/logo.svg';

const utterance = new SpeechSynthesisUtterance('');

class App extends Component {
    state = {
        lang: utterance.lang,
        rate: utterance.rate.toString(),
        pitch: utterance.pitch.toString(),
        volume: utterance.volume.toString(),
    };

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

        window.speechSynthesis.cancel();
        this.setState({ [name]: value });
    };

    setDefaultAudioSettings = () => {
        window.speechSynthesis.cancel();
        this.setState({
            lang: utterance.lang,
            rate: utterance.rate.toString(),
            pitch: utterance.pitch.toString(),
            volume: utterance.volume.toString(),
        });
    };
}

export default App;
