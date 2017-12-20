import React from 'react';
import PropTypes from 'prop-types';

import { TeaserText, Timer } from 'app/components';
import { TEASER } from 'app/shapes';
import { distanceToNow, formatDate } from 'app/utilities';

const Teaser = ({
    teaser, charIndex, elapsedTime, text, toggleSpeech, isPlaying,
}) => (
    <article className="teaser">
        <a href={teaser.href} tabIndex="-1">
            <h2>
                <span className="teaser__kicker">{teaser.supertitle}</span>
                <span className="teaser__title">{teaser.teaser_title || teaser.title}</span>
            </h2>
        </a>
        <div className="teaser__date">
            {distanceToNow(teaser.release_date)}
        </div>
        <p className="teaser__intro">{teaser.teaser_text}</p>
        <div className="teaser__player">
            <button className="teaser__playbutton" onClick={toggleSpeech}>
                {isPlaying ? <span className="teaser__pause" /> : '▶'}
            </button>
            <progress className="teaser__progress-bar" value={charIndex} max={text.length} />
            <div>
                <Timer running={isPlaying} reset={!elapsedTime} />
                <time>{formatDate(elapsedTime, 'mm:ss')}</time>
            </div>
        </div>
        <TeaserText text={text} charIndex={charIndex} hidden={!isPlaying} />
    </article>
);

Teaser.propTypes = {
    teaser: PropTypes.shape(TEASER).isRequired,
    charIndex: PropTypes.number.isRequired,
    elapsedTime: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    toggleSpeech: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
};
export default Teaser;
