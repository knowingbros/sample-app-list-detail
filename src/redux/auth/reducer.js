import {
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT,
    REFRESH_TOKEN_SUCCESS,
    USER_LOADED_FAIL,
    USER_LOADED_SUCCESS
} from './types'
import {USER_AUTH_SUBSCRIBE_SUBREDDIT, USER_AUTH_UNSUBSCRIBE_SUBREDDIT} from "../../actions/actionTypes";
import {objectById} from "../../utilities/reducerUtils";

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: localStorage.getItem('isAuthenticated'),
    user: null,
    username: "",
    pk: null,
    subredditsById: {},
    moderated_subs: [],
    error: null,
    loading: false,
    subs: [],
}

const findSubredditPkWithTitle = (state, title) => {
    const subreddit = Object.values(state.subredditsById).find(
        subreddit => subreddit.title === title
    );
    return subreddit ? subreddit.pk : null;
};


const authReducer = (state = initialState, action) => {
    const {type, data} = action

    switch (type) {

        // given a new subscription and the data of that subreddit, add it
        // to the User auth subreddit list
        case USER_AUTH_SUBSCRIBE_SUBREDDIT:
            return {
                ...state,
                subredditsById: {
                    ...state.subredditsById,
                    [action.data.pk]: data
                }
            };
        // when a user unsubs from a subreddit we need to update the redux store
        case USER_AUTH_UNSUBSCRIBE_SUBREDDIT:
            delete state.subredditsById[
                findSubredditPkWithTitle(state, data.subredditTitle)
                ];
            return {
                ...state,
                subredditsById: {...state.subredditsById}
            };

        case LOGIN_SUCCESS:
            localStorage.setItem('access', data.access)
            localStorage.setItem('refresh', data.refresh)
            localStorage.setItem('isAuthenticated', true)
            return {
                ...state,
                access: data.access,
                refresh: data.refresh,
                isAuthenticated: true,

            }

        case LOGIN_FAILED:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            localStorage.removeItem('isAuthenticated')

            return initialState

        case LOGOUT:

            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            localStorage.removeItem('isAuthenticated')
            return initialState
        // return {
        //     ...state,
        //     access: null,
        //     refresh: null,
        //     isAuthenticated: false,
        //
        // }
        case USER_LOADED_SUCCESS:
            console.log(`XXX data.user: ${data.user}`)
            console.log(`XXX data.user JSON stringify: ${JSON.stringify(data.user)}`)
            console.log(`XXX data JSON stringify: ${JSON.stringify(data)}`)
            console.log(`XXX action JSON stringify: ${JSON.stringify(action)}`)
            console.log(`XXX data.user: ${data.user.email}`)
            console.log(`XXX data.user.subs JSON stringify objectById: ${JSON.stringify(objectById(data.user.subs))}`)
            console.log(`XXX data.user.subs JSON stringify: ${JSON.stringify(data.user.subs)}`)
            return {
                ...state,
                user: data.user,
                username: data.user.username,
                subredditsById: objectById(data.user.subs),
            }
        case USER_LOADED_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('isAuthenticated')
            return initialState

        case AUTHENTICATED_SUCCESS:
            localStorage.setItem('isAuthenticated', true)

            return {
                ...state,
                isAuthenticated: true
            }
        case REFRESH_TOKEN_SUCCESS:
            localStorage.setItem('access', data.access)
            return {
                ...state,
                access: data.access,

            }
        case AUTHENTICATED_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('isAuthenticated')
            return initialState

        default:
            return state
    }

}
export const getAuthUserAccess = state => state.authReducer.access;
export const getAuthUserSubredditTitles = state =>
    Object.values(state.authReducer.subredditsById).map(
        subreddit => subreddit.title
    );
export const getAuthUsername = state => state.authReducer.username;
export default authReducer