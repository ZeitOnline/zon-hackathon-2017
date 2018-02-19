import React from 'react';
import PropTypes from 'prop-types';

const PlayButton = props => (
    <button
        className={props.className}
        onClick={props.onClick}
        disabled={props.disabled ? 'disabled' : ''}
    >
        {props.isPlaying ? <span className="player__pause" /> : '▶'}
    </button>
);

PlayButton.propTypes = {
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired,
};

export default PlayButton;
