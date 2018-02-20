import React from 'react';
import PropTypes from 'prop-types';

import playIcon from 'app/svg/play.svg';
import pauseIcon from 'app/svg/pause.svg';

const PlayButton = props => (
    <button
        className="icon-button icon-button--play-pause"
        onClick={props.onClick}
        disabled={props.disabled ? 'disabled' : ''}
        aria-label={props.isPlaying ? 'Pausieren' : 'Abspielen'}
        title={props.isPlaying ? 'Pausieren' : 'Abspielen'}
    >
        <svg>
            {props.isPlaying ?
                <use xlinkHref={pauseIcon.url} /> :
                <use xlinkHref={playIcon.url} />}
        </svg>
    </button>
);

PlayButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    isPlaying: PropTypes.bool.isRequired,
};

PlayButton.defaultProps = {
    disabled: false,
};

export default PlayButton;
