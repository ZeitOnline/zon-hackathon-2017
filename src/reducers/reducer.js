const initialState = {
    isPlaying: false,
    uuid: 0,
    text: '',
};

export default function audioExplorer(state = initialState, action) {
    switch (action) {
        case 'PLAY_TEASER':
            return {
                ...state,
                isPlaying: action.payload.isPlaying,
                uuid: action.payload.uuid,
                text: action.payload.text,
            };
        case 'PAUSE_TEASER':
            return {
                ...state,
                isPlaying: action.payload.isPlaying,
            };
        default:
            return state;
    }
}
