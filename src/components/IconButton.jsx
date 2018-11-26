import React from 'react';
import PropTypes from 'prop-types';

const ICON_BUTTON_CLASS = 'icon-button';

const IconButton = ({ icon, title, onClick, disabled, modifiers, active }) => (
    <button
        className={`${ICON_BUTTON_CLASS} ${mapToClassNames(modifiers, active)}`}
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
    active: PropTypes.bool,
    modifiers: PropTypes.arrayOf(PropTypes.string),
};

IconButton.defaultProps = {
    disabled: false,
    modifiers: [],
    active: false,
};

function mapToClassNames(modifiers, active) {
    let classNames = '';
    classNames += active ? ` ${ICON_BUTTON_CLASS}--active` : '';
    modifiers.forEach((m) => {
        classNames += ` ${ICON_BUTTON_CLASS}--${m}`;
    });
    return classNames;
}

export default IconButton;
