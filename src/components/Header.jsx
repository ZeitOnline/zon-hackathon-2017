import React from 'react';

import logo from 'app/svg/logo.svg';

const Header = () => (
    <header className="header">
        <svg className="header_logo"><use xlinkHref={logo.url} /></svg>
    </header>
);

export default Header;
