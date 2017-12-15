import React from 'react';
import PropTypes from 'prop-types';

import { TEASER } from 'app/shapes';

const Teaser = ({ teaser, toggleSpeech }) => (
    <article className="teaser">
        <a href={teaser.href}>
            <h2>
                <span className="teaser__kicker">{teaser.supertitle}</span>
                <span className="teaser__title">{teaser.teaser_title || teaser.title}</span>
            </h2>
        </a>
        <p>{teaser.teaser_text}</p>
        <button className="teaser__playbutton" onClick={toggleSpeech}>PLAY</button>
    </article>
);

Teaser.propTypes = {
    teaser: PropTypes.shape(TEASER).isRequired,
    toggleSpeech: PropTypes.func.isRequired,
};
export default Teaser;
