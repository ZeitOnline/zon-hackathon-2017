import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { resetAudioSettings } from 'app/actions/audioSettings';
import { Header, TeaserList, PlayerContainer, ErrorScreen } from 'app/components';

class App extends Component {
    static propTypes = {
        resetAudioSettings: PropTypes.func.isRequired,
    };

    state = {
        supportsSpeech: false,
    };

    componentDidMount() {
        if (typeof speechSynthesis !== 'undefined') {
            this.setState({ supportsSpeech: true }); // eslint-disable-line

            this.props.resetAudioSettings();
            if (speechSynthesis.onvoiceschanged !== undefined) {
                // Chrome - wait for voiceschanged event
                speechSynthesis.addEventListener('voiceschanged', this.props.resetAudioSettings);
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <main>
                    <Header />
                    {this.state.supportsSpeech ? (
                        <TeaserList />
                    ) : (
                        <ErrorScreen />
                    )}
                </main>
                {this.state.supportsSpeech && <PlayerContainer />}
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = {
    resetAudioSettings,
};

export default connect(null, mapDispatchToProps)(App);
