import React from 'react';
import PropTypes from 'prop-types';

const Teaser = ({ teaser }) => (
    <article className="teaser">
        <h2>
            <span className="teaser__kicker">{teaser.supertitle}</span>
            <span className="teaser__title">{teaser.teaser_title || teaser.title}</span>
        </h2>
        <p>{teaser.teaser_text}</p>
    </article>
);

Teaser.propTypes = {
    teaser: PropTypes.shape({
        title: PropTypes.string,
        supertitle: PropTypes.string,
        teaser_title: PropTypes.string,
        teaser_text: PropTypes.string,
    }).isRequired,
};
export default Teaser;
