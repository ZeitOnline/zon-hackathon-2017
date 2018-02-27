import React from 'react';
import PropTypes from 'prop-types';

import { TEASER } from 'app/shapes';
import { Timer, TimeEstimateDynamic } from 'app/components';
import { countWords } from 'app/utilities';

const TrackInfo = (props) => {
    const {
        currentTeaser,
        isPlaying,
        elapsedTime,
        readChars,
        remainingText,
        charIndex,
    } = props;

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
                    value={readChars}
                    max={currentTeaser.playerText.length - 1}
                />
                <TimeEstimateDynamic
                    wordCount={currentTeaser.wordCount}
                    readWords={countWords(
                        remainingText,
                        charIndex,
                    )}
                />
            </div>
        </div>
    );
};

TrackInfo.propTypes = {
    currentTeaser: PropTypes.shape(TEASER),
    isPlaying: PropTypes.bool.isRequired,
    charIndex: PropTypes.number.isRequired,
    readChars: PropTypes.number.isRequired,
    elapsedTime: PropTypes.number.isRequired,
    remainingText: PropTypes.string.isRequired,
};

TrackInfo.defaultProps = {
    currentTeaser: null,
};

export default TrackInfo;
