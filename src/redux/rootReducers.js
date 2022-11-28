import {combineReducers} from 'redux'
import authReducer from './auth/reducer'
import alertReducer from './alert/reducer'
import loaderReducer from './loader/reducre'
import reloadReducer from './reload/reducre'
import subreddit from "../reducers/subreddit";
import postDetail from "../reducers/postDetail";
import comments from "../reducers/comments";
import postList from "../reducers/postList";
import pxulwList from "../reducers/pxulwList";
import createPost from "../reducers/createPost";
import createSubreddit from "../reducers/createSubreddit";
import dummyLusi from "../reducers/dummyLusi";
import editPost from "../reducers/editPost";
import search from "../reducers/search";
import userProfile from "../reducers/userProfile";
import initialVisit from "../reducers/initialVisit";
import sortBy from "../reducers/sortBy";
import resetopasu from "../reducers/resetopasu";
import resetokakunin from "../reducers/resetokakunin";


const rootReducer = combineReducers({
    authReducer,
    alertReducer,
    loaderReducer,
    reloadReducer,
    subreddit,
    postDetail,
    comments,
    postList,
    pxulwList,
    createPost,
    createSubreddit,
    dummyLusi,
    editPost,
    search,
    userProfile,
    initialVisit,
    sortBy,
    resetopasu,
    resetokakunin,

})


export default rootReducer