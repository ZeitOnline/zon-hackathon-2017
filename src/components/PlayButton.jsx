import React from 'react';
import PropTypes from 'prop-types';

const PlayButton = props => (
    <button
        className="play-button"
        onClick={props.onClick}
        disabled={props.disabled ? 'disabled' : ''}
    >
        {props.isPlaying ? <span className="play-button__pause" /> : '▶'}
    </button>
);

PlayButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired,
};

export default PlayButton;
