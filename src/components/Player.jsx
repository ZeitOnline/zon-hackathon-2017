import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { TEASER } from 'app/shapes';
import { Timer, TimeEstimateDynamic, PlayButton, IconButton, TextDisplay } from 'app/components';
import { countWords } from 'app/utilities';
import settingsIcon from 'app/svg/settings.svg';
import playlistIcon from 'app/svg/playlist.svg';

class Player extends Component {
    static propTypes = {
        currentTeaser: PropTypes.shape(TEASER),
        isPlaying: PropTypes.bool.isRequired,
        handlePlayPause: PropTypes.func.isRequired,
        charIndex: PropTypes.number.isRequired,
        elapsedTime: PropTypes.number.isRequired,
    };

    static defaultProps = {
        currentTeaser: null,
    }

    state = {
        showText: false,
    }

    render() {
        const {
            isPlaying,
            handlePlayPause,
            charIndex,
            currentTeaser,
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
                    {!disabled && this.renderTrackInfo()}
                    <div className="player__buttons">
                        <IconButton
                            icon={playlistIcon}
                            title="Playlist anzeigen"
                            onClick={this.toggleTextDisplay}
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
                {!disabled && (
                    <CSSTransition
                        classNames="slide"
                        timeout={300}
                        mountOnEnter
                        unmountOnExit
                        in={this.state.showText}
                    >
                        <TextDisplay
                            charIndex={charIndex}
                            hidden={false}
                            text={currentTeaser.playerText}
                        />
                    </CSSTransition>
                )}
            </div>
        );
    }

    renderTrackInfo() {
        const {
            isPlaying,
            currentTeaser,
            charIndex,
            elapsedTime,
        } = this.props;

        return (
            <div className="player__track-info">
                <h2 className="player__track">
                    <span className="player__kicker">
                        {currentTeaser.supertitle}
                    </span>
                    <span className="player__title">
                        {currentTeaser.title}
                    </span>
                </h2>
                <div className="player__progress">
                    <Timer
                        running={isPlaying}
                        reset={!elapsedTime}
                    />
                    <progress
                        className="player__progress-bar"
                        value={charIndex}
                        max={currentTeaser.playerText.length}
                    />
                    <TimeEstimateDynamic
                        wordCount={currentTeaser.wordCount}
                        readWords={countWords(
                            currentTeaser.playerText,
                            charIndex,
                        )}
                    />
                </div>
            </div>
        );
    }

    toggleTextDisplay = () => {
        console.log('toggle text-display');
        this.setState({
            showText: !this.state.showText,
        });
    }
}

export default Player;
