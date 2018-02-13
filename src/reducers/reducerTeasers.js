import { FETCH_TEASERS, FETCH_TEASERS_ERROR, FETCH_TEASERS_SUCCESS } from '../actions/teasers';

const initialState = {
    loading: false,
    error: '',
    teaserList: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TEASERS:
            return {
                ...state,
                loading: true,
                error: '',
                teaserList: [],
            };
        case FETCH_TEASERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
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
