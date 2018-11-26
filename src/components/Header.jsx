import React from 'react';

import logo from 'app/svg/logo.svg';

const Header = () => (
    <header className="header">
        <svg className="header__logo"><use xlinkHref={logo.url} /></svg>
        <h1 className="header__title">Audio Explorer</h1>
    </header>
);

export default Header;
