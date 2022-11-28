import {
    DELETE_PXULW_FAILURE,
    DELETE_PXULW_REQUEST,
    DELETE_PXULW_SUCCESS,
    FETCH_PXULW_LIST_FAILURE,
    FETCH_PXULW_LIST_NEXT_FAILURE,
    FETCH_PXULW_LIST_NEXT_REQUEST,
    FETCH_PXULW_LIST_NEXT_SUCCESS,
    FETCH_PXULW_LIST_REQUEST,
    FETCH_PXULW_LIST_SUCCESS,
    FETCH_USER_PROFILE_SUCCESS, POST_VOTE_SUCCESS,
    PXULW_VOTE_SUCCESS,
    SEARCH_SUCCESS
} from "../actions/actionTypes";
import {allIds, pxulwsById, updateObjectOnVote} from "../utilities/reducerUtils";

// TODO: figure out why this descruture isnt working right on pxulwsById.
// For some reason rest still contains the pxulwId element
const deletePxulw = (state, pxulwId) => {
    const {[pxulwId]: deletedOne, ...rest} = state.pxulwsById;
    delete rest[pxulwId];

    const newAllPxulws = [...state.allPxulws];
    const deletionIndex = newAllPxulws.indexOf(pxulwId);
    newAllPxulws.splice(deletionIndex, 1);

    return {
        ...state,
        pxulwsById: {...rest},
        allPxulws: [...newAllPxulws],
        deletionPxulwId: null
    };
};

// When we successfully request a new page, dont replace the pxulws
// that are already here. Instead append to allPxulws (addNextIds)
// and add the new pxulw information into pxulwsById (addNextPxulws)
const addNextPxulws = (state, newPxulwList) => {
    return {...state.pxulwsById, ...pxulwsById(newPxulwList)};
};
const addNextIds = (state, newPxulwList) => {
    // concat performs a shallow copy
    return state.allPxulws.concat(allIds(newPxulwList));
};

const initialState = {
    pxulwsById: {},
    allPxulws: [],
    loading: true,
    error: null,
    nextPageError: null,
    deletionPxulwId: null,
    deleteError: null,
    nextPageUrl: null
};

const pxulwList = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PXULW_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_PXULW_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                pxulwsById: pxulwsById(action.data.results),
                allPxulws: allIds(action.data.results),
                nextPageUrl: action.data.next
            };
        case FETCH_PXULW_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case FETCH_PXULW_LIST_NEXT_REQUEST:
            return {
                ...state,
                nextPageError: null
            };
        case FETCH_PXULW_LIST_NEXT_SUCCESS:
            return {
                ...state,
                nextPageError: null,
                pxulwsById: addNextPxulws(state, action.data.results),
                allPxulws: addNextIds(state, action.data.results),
                nextPageUrl: action.data.next
            };
        case FETCH_PXULW_LIST_NEXT_FAILURE:
            return {
                ...state,
                nextPageError: action.error
            };
        case POST_VOTE_SUCCESS:
            const pxulwId = action.data.post; // IMPORT to keept it as data.post
            console.log(`XXXVT pxulwId: ${JSON.stringify(pxulwId)}`)
            return {
                ...state,
                pxulwsById: {
                    ...state.pxulwsById,
                    [pxulwId]: updateObjectOnVote(
                        state.pxulwsById[pxulwId],
                        action.data.vote_type
                    )
                }
            };
        case DELETE_PXULW_REQUEST:
            return {
                ...state,
                deleteError: null,
                deletionPxulwId: Number(action.pk)
            };
        case DELETE_PXULW_SUCCESS:
            return deletePxulw(state, state.deletionPxulwId);
        case DELETE_PXULW_FAILURE:
            return {
                ...state,
                deleteError: action.error
            };
        case SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                pxulwsById: pxulwsById(action.data.pxulws),
                allPxulws: allIds(action.data.pxulws)
            };
        case FETCH_USER_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                pxulwsById: pxulwsById(action.data.pxulws),
                allPxulws: allIds(action.data.pxulws)
            };
        default:
            return state;
    }
};

// selectors
export const getPxulwById = (state, pk) => state.pxulwList.pxulwsById[pk];
export const getPxulwBodyById = (state, pk) =>
    getPxulwById(state, pk) ? getPxulwById(state, pk).body : null;
export const getAllPxulws = state => state.pxulwList.allPxulws;
export const getPxulwListLoading = state => state.pxulwList.loading;
export const getPxulwListError = state => state.pxulwList.error;
export const getPxulwListNextPageUrl = state => state.pxulwList.nextPageUrl;

export default pxulwList;
