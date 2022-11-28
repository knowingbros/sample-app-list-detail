import {
    FETCH_POST_DETAIL_FAILURE,
    FETCH_POST_DETAIL_REQUEST,
    FETCH_POST_DETAIL_SUCCESS,
    FETCH_POST_LIST_SUCCESS,
    POST_VOTE_SUCCESS,
    UPDATE_POST_SUCCESS
} from "../actions/actionTypes";
import {updateObjectOnVote} from "../utilities/reducerUtils";

const initialState = {
  title: null,
  body: null,
  poster: null,
  voteDisplayState: 0,
  upvotes: 0,
  engtitletranslation: null,
  cover: null,
  pk: null,
  error: null,
  loading: false
};

const postDetail = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST_DETAIL_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case FETCH_POST_DETAIL_SUCCESS:
      return {
        ...state,
        title: action.data.title,
        body: action.data.body,
        poster: action.data.poster_username,
        voteDisplayState: action.data.vote_state,
        engtitletranslation: action.data.engtitletranslation,
        cover: action.data.cover,
        upvotes: action.data.upvotes,
        pk: action.data.pk,
        loading: false,
        error: null
      };
    case FETCH_POST_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        body: action.data.body
      };
    case FETCH_POST_LIST_SUCCESS:
      // This makes the scroll to comments in PostDetail work
      return {
        ...state,
        loading: false,
        pk: null
      };
    case POST_VOTE_SUCCESS:
      return {
        ...updateObjectOnVote(state, action.data.vote_type)
      };
    default:
      return state;
  }
};

// Selectors

export const getPostDetailTitle = state => state.postDetail.title;
export const getPostDetailBody = state => state.postDetail.body;
export const getPostDetailPosterUsername = state => state.postDetail.poster;
export const getPostDetailPk = state => state.postDetail.pk;
export const getPostDetailLoading = state => state.postDetail.loading;
export const getPostDetailData = state => ({
  title: getPostDetailTitle(state),
  body: getPostDetailBody(state),
  posterUsername: getPostDetailPosterUsername(state),
  pk: getPostDetailPk(state),
  loading: getPostDetailLoading(state),
  voteDisplayState: state.postDetail.voteDisplayState,
  engtitletranslation: state.postDetail.engtitletranslation,
  cover: state.postDetail.cover,
  upvotes: state.postDetail.upvotes
});

export default postDetail;
