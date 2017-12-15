import React from 'react';

import { TeaserList } from 'app/components';
import logo from 'app/svg/logo.svg';

const App = () => (
    <div>
        <header className="header">
            <svg className="header_logo"><use xlinkHref={logo.url} /></svg>
        </header>
        <TeaserList headline="Audio Explorer" />
    </div>
);

export default App;
