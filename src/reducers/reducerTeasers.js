import { FETCH_TEASERS, FETCH_TEASERS_ERROR, FETCH_TEASERS_SUCCESS } from '../actions/teasers';

const initialState = {
    loading: false,
    error: null,
    teaserList: [],
};

export default function (state = initialState, action) {
    switch (action) {
        case FETCH_TEASERS:
            return {
                ...state,
                loading: true,
                error: null,
                teaserList: [],
            };
        case FETCH_TEASERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                teaserList: action.payload,
            };
        case FETCH_TEASERS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                teaserList: [],
            };
        default:
            return state;
    }
}
