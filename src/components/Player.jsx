import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TEASER } from 'app/shapes';
import { TrackInfo, PlayerContext, PlayButton, IconButton } from 'app/components';
import settingsIcon from 'app/svg/settings.svg';
import playlistIcon from 'app/svg/playlist.svg';

class Player extends Component {
    static propTypes = {
        currentTeaser: PropTypes.shape(TEASER),
        isPlaying: PropTypes.bool.isRequired,
        handlePlayPause: PropTypes.func.isRequired,
        charIndex: PropTypes.number.isRequired,
        readChars: PropTypes.number.isRequired,
        elapsedTime: PropTypes.number.isRequired,
        remainingText: PropTypes.string,
    };

    static defaultProps = {
        currentTeaser: null,
        remainingText: '',
    }

    state = {
        visibleContext: '',
    }

    render() {
        const {
            isPlaying,
            currentTeaser,
            remainingText,
            charIndex,
            readChars,
            elapsedTime,
            handlePlayPause,
        } = this.props;

        const disabled = !this.props.currentTeaser;


        return (
            <div className="player-wrapper">
                <div className={`player ${disabled ? 'player--inactive' : ''}`}>
                    <PlayButton
                        isPlaying={isPlaying}
                        onClick={handlePlayPause}
                        disabled={disabled}
                    />

                    {!disabled && <TrackInfo
                        currentTeaser={currentTeaser}
                        isPlaying={isPlaying}
                        elapsedTime={elapsedTime}
                        readChars={readChars}
                        remainingText={remainingText}
                        charIndex={charIndex}
                    />}

                    <div className="player__buttons">
                        <IconButton
                            icon={playlistIcon}
                            title="Text anzeigen"
                            onClick={() => this.showContext('text')}
                            disabled={disabled}
                            active={this.state.visibleContext === 'text'}
                            modifiers={['text', 'tab']}
                        />
                        <IconButton
                            icon={settingsIcon}
                            title="Einstellungen anzeigen"
                            onClick={() => this.showContext('settings')}
                            active={this.state.visibleContext === 'settings'}
                            modifiers={['settings', 'tab']}
                        />
                    </div>

                </div>

                <PlayerContext
                    visibleContext={this.state.visibleContext}
                    currentTeaser={currentTeaser}
                    readChars={readChars}
                />

            </div>
        );
    }

    showContext = (name) => {
        this.setState({
            visibleContext: this.state.visibleContext === name ? '' : name,
        });
    }
}

export default Player;
