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
        remainingText: PropTypes.string.isRequired,
    };

    static defaultProps = {
        currentTeaser: null,
    }

    state = {
        showPlayerContext: false,
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
                            title="Playlist anzeigen"
                            onClick={this.togglePlayerContext}
                            disabled={disabled}
                            modifiers={['playlist']}
                        />
                        <IconButton
                            icon={settingsIcon}
                            title="Einstellungen anzeigen"
                            onClick={() => console.log('toggle settings')}
                        />
                    </div>
                </div>

                {!disabled && <PlayerContext
                    show={this.state.showPlayerContext}
                    currentTeaser={currentTeaser}
                    readChars={readChars}
                />}

            </div>
        );
    }

    togglePlayerContext = () => {
        this.setState({
            showPlayerContext: !this.state.showPlayerContext,
        });
    }
}

export default Player;
