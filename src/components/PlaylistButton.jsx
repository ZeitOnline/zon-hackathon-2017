import React from 'react';
import PropTypes from 'prop-types';

import playlist from 'app/svg/playlist-2.svg';

const PlaylistButton = ({ onClick }) => (
    <button
        className="icon-button icon-button--playlist"
        title="Playlist anzeigen"
        aria-label="Playlist anzeigen"
        onClick={onClick}
    >
        <svg>
            <use xlinkHref={playlist.url} />
        </svg>
    </button>
);

PlaylistButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default PlaylistButton;
