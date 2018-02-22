import React from 'react';
import PropTypes from 'prop-types';

import { IconButton } from 'app/components';
import playIcon from 'app/svg/play.svg';
import pauseIcon from 'app/svg/pause.svg';

const PlayButton = ({ isPlaying, ...props }) => {
    if (isPlaying) {
        return <IconButton {...props} icon={pauseIcon} title="Pausieren" />;
    }
    return <IconButton {...props} icon={playIcon} title="Abspielen" />;
};

PlayButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    modifiers: PropTypes.arrayOf(PropTypes.string),
};

PlayButton.defaultProps = {
    disabled: false,
    modifiers: ['play-pause'],
};

export default PlayButton;
