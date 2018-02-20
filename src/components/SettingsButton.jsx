import React from 'react';

import settings from 'app/svg/settings.svg';


const SettingsButton = () => (
    <button
        className="icon-button icon-button--settings"
        title="Einstellungen anzeigen"
        aria-label="Einstellungen anzeigen"
    >
        <svg>
            <use xlinkHref={settings.url} />
        </svg>
    </button>
);

export default SettingsButton;
