export const PLAYER_PLAY = 'PLAYER_PLAY';
export const PLAYER_PAUSE = 'PLAYER_PAUSE';
export const PLAYER_RESET = 'PLAYER_RESET';

export function play(uuid) {
    return {
        type: PLAYER_PLAY,
        payload: uuid,
    };
}

export function pause() {
    return {
        type: PLAYER_PAUSE,
    };
}

export function resetPlayer() {
    return {
        type: PLAYER_RESET,
    };
}
