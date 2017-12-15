import React from 'react';
import PropTypes from 'prop-types';

const Teaser = ({ teaser, toggleSpeech }) => (
    <article className="teaser">
        <h2>
            <span className="teaser__kicker">{teaser.supertitle}</span>
            <span className="teaser__title">{teaser.teaser_title || teaser.title}</span>
        </h2>
        <p>{teaser.teaser_text}</p>
        <button className="teaser__playbutton" onClick={toggleSpeech}>PLAY</button>
    </article>
);

Teaser.propTypes = {
    teaser: PropTypes.shape({
        title: PropTypes.string,
        supertitle: PropTypes.string,
        teaser_title: PropTypes.string,
        teaser_text: PropTypes.string,
    }).isRequired,
    toggleSpeech: PropTypes.func.isRequired,
};
export default Teaser;
