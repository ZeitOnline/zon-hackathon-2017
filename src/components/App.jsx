import React, { Component } from 'react';

import { TeaserList, AudioSettings, Player } from 'app/components';
import logo from 'app/svg/logo.svg';

class App extends Component {
    render() {
        return (
            <div>
                <header className="header">
                    <svg className="header_logo"><use xlinkHref={logo.url} /></svg>
                </header>
                <AudioSettings
                    // {...this.state}
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
}

export default App;
