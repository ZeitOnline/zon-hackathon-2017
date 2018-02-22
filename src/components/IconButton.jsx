import React from 'react';
import PropTypes from 'prop-types';

const IconButton = ({ icon, title, onClick, disabled, modifiers }) => (
    <button
        className={`icon-button ${mapToClassNames(modifiers)}`}
        title={title}
        aria-label={title}
        onClick={onClick}
        disabled={disabled ? 'disabled' : ''}
    >
        <svg>
            <use xlinkHref={icon.url} />
        </svg>
    </button>
);

IconButton.propTypes = {
    icon: PropTypes.objectOf(PropTypes.any).isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    modifiers: PropTypes.arrayOf(PropTypes.string),
};

IconButton.defaultProps = {
    disabled: false,
    modifiers: [],
};

function mapToClassNames(modifiers) {
    let classNames = '';
    modifiers.forEach((m) => {
        classNames += ` icon-button--${m}`;
    });
    return classNames;
}

export default IconButton;
