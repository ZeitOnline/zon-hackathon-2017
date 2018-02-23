import React from 'react';

import { Header, TeaserList, AudioSettings, PlayerContainer } from 'app/components';

const App = () => (
    <div>
        <Header />
        <AudioSettings />
        <TeaserList />
        <PlayerContainer />
    </div>
);

export default App;
