import React from 'react';

import playlist from 'app/svg/playlist-2.svg';

const PlaylistButton = () => (
    <button
        className="icon-button icon-button--playlist"
        title="Playlist anzeigen"
        aria-label="Playlist anzeigen"
    >
        <svg>
            <use xlinkHref={playlist.url} />
        </svg>
    </button>
);

export default PlaylistButton;
