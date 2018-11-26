import React from 'react';

const ErrorScreen = () => (
    <div className="error-screen">
        <strong>Ihr Browser oder Betriebssystem unterstützt leider keine Sprachausgabe.</strong>
        <p>Bitte verwenden Sie macOS oder Windows mit einem der folgenden Browser:</p>
        <ul>
            <li>Chrome</li>
            <li>Firefox</li>
            <li>Edge</li>
        </ul>
    </div>
);

export default ErrorScreen;
