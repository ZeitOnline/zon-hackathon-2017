import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { resetAudioSettings } from 'app/actions/audioSettings';
import { Header, TeaserList, PlayerContainer } from 'app/components';

class App extends Component {
    static propTypes = {
        resetAudioSettings: PropTypes.func.isRequired,
    }

    componentDidMount() {
        speechSynthesis.addEventListener('voiceschanged', this.props.resetAudioSettings);
    }

    render() {
        return (
            <div>
                <Header />
                <TeaserList />
                <PlayerContainer />
            </div>
        );
    }
}

const mapDispatchToProps = {
    resetAudioSettings,
};

export default connect(null, mapDispatchToProps)(App);
