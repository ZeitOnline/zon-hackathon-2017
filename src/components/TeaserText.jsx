import React from 'react';
import PropTypes from 'prop-types';

const TeaserText = ({ text, charIndex, hidden }) => {
    const end = text.replace(/\s/g, ' ').indexOf(' ', charIndex);

    return (
        <p className="teaser__text" hidden={hidden}>
            {text.slice(0, charIndex)}
            <mark>{text.slice(charIndex, end)}</mark>
            {text.slice(end)}
        </p>
    );
};

TeaserText.propTypes = {
    text: PropTypes.string.isRequired,
    charIndex: PropTypes.number.isRequired,
    hidden: PropTypes.bool.isRequired,
};

export default TeaserText;
