import React from 'react';
import PropTypes from 'prop-types';

import { TEASER } from 'app/shapes';
import { distanceToNow } from 'app/utilities';

const Teaser = ({ teaser, charIndex, length, toggleSpeech, isPlaying }) => (
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
        <p>{teaser.teaser_text}</p>
        <button className="teaser__playbutton" onClick={toggleSpeech}>
            {isPlaying ? <span className="teaser__pause" /> : '▶'}
        </button>
        <progress value={charIndex} max={length} />
    </article>
);

Teaser.propTypes = {
    teaser: PropTypes.shape(TEASER).isRequired,
    charIndex: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    toggleSpeech: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
};
export default Teaser;
