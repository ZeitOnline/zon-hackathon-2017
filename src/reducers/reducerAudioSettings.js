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
        case RESET_AUDIO_SETTINGS:
            if (
                action.payload.rate >= 0.5
                || action.payload.pitch >= 0
                || action.payload.volume >= 0
            ) {
                return {
                    ...state,
                    ...action.payload,
                };
            }
            return state;
        default:
            return state;
    }
}
