import { PLAYER_PLAY, PLAYER_PAUSE, PLAYER_RESET } from '../actions/player';

const initialState = {
    isPlaying: false,
    currentUUID: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PLAYER_PLAY:
            return {
                ...state,
                isPlaying: true,
                currentUUID: action.payload,
            };
        case PLAYER_PAUSE:
            return {
                ...state,
                isPlaying: false,
            };
        case PLAYER_RESET:
            return {
                ...state,
                isPlaying: false,
                currentUUID: '',
            };
        default:
            return state;
    }
}
