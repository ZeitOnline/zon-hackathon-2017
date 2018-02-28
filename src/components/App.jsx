import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { resetAudioSettings } from 'app/actions/audioSettings';
import { Header, TeaserList, PlayerContainer, ErrorScreen } from 'app/components';

class App extends Component {
    static propTypes = {
        resetAudioSettings: PropTypes.func.isRequired,
    }

    state = {
        supportsSpeech: false,
    }

    componentDidMount() {
        if (typeof speechSynthesis !== 'undefined') {
            this.setState({ supportsSpeech: true }); // eslint-disable-line

            if (speechSynthesis.onvoiceschanged !== undefined) {
                // Chrome - wait for voiceschanged event
                speechSynthesis.addEventListener('voiceschanged', this.props.resetAudioSettings);
            } else {
                // Firefox - should work immediately
                this.props.resetAudioSettings();
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                {this.state.supportsSpeech ? (
                    <div>
                        <TeaserList />
                        <PlayerContainer />
                    </div>
                ) : (
                    <ErrorScreen />
                )}
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = {
    resetAudioSettings,
};

export default connect(null, mapDispatchToProps)(App);
