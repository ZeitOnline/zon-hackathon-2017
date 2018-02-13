export const PLAYER_PLAY = 'PLAYER_PLAY';
export const PLAYER_PAUSE = 'PLAYER_PAUSE';
export const PLAYER_RESET = 'PLAYER_RESET';

export function playerPlay(uuid) {
    return {
        type: PLAYER_PLAY,
        payload: uuid,
    };
}

export function playerPause() {
    return {
        type: PLAYER_PAUSE,
    };
}

export function playerReset() {
    return {
        type: PLAYER_RESET,
    };
}
