import fetchData from 'app/utilities/fetchData';

export const FETCH_TEASERS = 'FETCH_TEASERS';
export const FETCH_TEASERS_SUCCESS = 'FETCH_TEASERS_SUCCESS';
export const FETCH_TEASERS_ERROR = 'FETCH_TEASERS_ERROR';

export function fetchTeasers() {
    const request = fetchData();

    return {
        type: FETCH_TEASERS,
        payload: request,
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
