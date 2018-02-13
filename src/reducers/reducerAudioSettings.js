import { UPDATE_AUDIO_SETTINGS, RESET_AUDIO_SETTINGS } from '../actions/audioSettings';

const initialState = {
    voiceList: [],
    voice: '',
    rate: 1,
    pitch: 1,
    volume: 1,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_AUDIO_SETTINGS:
            return {
                ...state,
                ...action.payload,
            };
        case RESET_AUDIO_SETTINGS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
