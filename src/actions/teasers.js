export const FETCH_TEASERS = 'FETCH_TEASERS';
export const FETCH_TEASERS_SUCCESS = 'FETCH_TEASERS_SUCCESS';
export const FETCH_TEASERS_ERROR = 'FETCH_TEASERS_ERROR';
export const UPDATE_TEASER = 'UPDATE_TEASER';

export function fetchTeasers() {
    return {
        type: FETCH_TEASERS,
        payload: null,
    };
}

export function fetchTeasersSuccess(teasers) {
    return {
        type: FETCH_TEASERS_SUCCESS,
        payload: teasers,
    };
}

export function fetchTeasersError(error) {
    return {
        type: FETCH_TEASERS_ERROR,
        payload: error,
    };
}

export function updateTeaser(teaser) {
    return {
        type: UPDATE_TEASER,
        payload: teaser,
    };
}
