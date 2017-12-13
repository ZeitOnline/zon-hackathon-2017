import React from 'react';

import logo from 'app/svg/logo.svg';

const App = () => (
    <div>
        <header className="header">
            <svg className="header_logo"><use xlinkHref={logo.url} /></svg>
        </header>
        <main>
            Main
        </main>
    </div>
);

export default App;
