import React from 'react';
import PropTypes from 'prop-types';

const TeaserText = ({ text, charIndex }) => {
    const end = text.replace(/\s/g, ' ').indexOf(' ', charIndex);

    return (
        <p className="teaser__text">
            {text.slice(0, charIndex)}
            <mark>{text.slice(charIndex, end)}</mark>
            {text.slice(end)}
        </p>
    );
};

TeaserText.propTypes = {
    text: PropTypes.string.isRequired,
    charIndex: PropTypes.number.isRequired,
};

export default TeaserText;
