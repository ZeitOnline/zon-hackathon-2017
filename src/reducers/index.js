import { combineReducers } from 'redux';

import reducerTeasers from './reducerTeasers';
import reducerPlayer from './reducerPlayer';
import reducerAudioSettings from './reducerAudioSettings';

const rootReducer = combineReducers({
    teasers: reducerTeasers,
    player: reducerPlayer,
    audioSettings: reducerAudioSettings,
});

export default rootReducer;
