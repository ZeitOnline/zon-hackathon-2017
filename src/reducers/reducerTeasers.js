import { FETCH_TEASERS, FETCH_TEASERS_ERROR,
    FETCH_TEASERS_SUCCESS, UPDATE_TEASER } from '../actions/teasers';

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
        case UPDATE_TEASER:
            return {
                ...state,
                teaserList: updateTeaserInArray(
                    state.teaserList,
                    action.payload,
                ),
            };
        default:
            return state;
    }
}

function updateTeaserInArray(teaserList, teaser) {
    const updatedTeaserList = teaserList.map((t) => {
        if (t.uuid !== teaser.uuid) {
            return t;
        }
        const updatedTeaser = { ...t, ...teaser };
        return updatedTeaser;
    });

    return updatedTeaserList;
}
