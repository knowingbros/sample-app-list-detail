import {normalize, schema} from "normalizr";

import {
    API_CREATE_COMMENT,
    API_DELETE_COMMENT,
    API_POST_COMMENT_TREES,
    API_UPDATE_COMMENT,
    CREATE_COMMENT_FAILURE,
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    FETCH_POST_COMMENT_TREES_FAILURE,
    FETCH_POST_COMMENT_TREES_REQUEST,
    FETCH_POST_COMMENT_TREES_SUCCESS,
    UPDATE_COMMENT_FAILURE,
    UPDATE_COMMENT_REQUEST,
    UPDATE_COMMENT_SUCCESS
} from "../actionTypes";
import {createCommentApi, deleteCommentApi, getCommentTreeApi, updateCommentApi} from "../../api/Comments";
import {getAuthUserAccess} from "../../redux/auth/reducer";

// Use redux-thunk to get the userAuth token
export const makeCommentTreeRequest = postPk => (dispatch, getState) =>
  dispatch({
    type: API_POST_COMMENT_TREES,
    types: {
      request: FETCH_POST_COMMENT_TREES_REQUEST,
      success: normalizeCommentTreeOnSuccess,
      failure: FETCH_POST_COMMENT_TREES_FAILURE
    },
    callAPI: () => getCommentTreeApi(postPk, getAuthUserAccess(getState()))
  });

// When comment trees are successfully fetched, normalize them for redux store
const normalizeCommentTreeOnSuccess = (nestedComments, getState, dispatch) => {
  if (nestedComments.length === 0) {
    return dispatch({
      type: FETCH_POST_COMMENT_TREES_SUCCESS,
      data: { entities: { comments: {}, posters: {} }, result: [] }
    });
  }
  const posterSchema = new schema.Entity("posters", {}, { idAttribute: "pk" });
  const commentSchema = new schema.Entity(
    "comments",
    { poster: posterSchema },
    { idAttribute: "pk" }
  );
  const commentListSchema = new schema.Array(commentSchema);
  commentSchema.define({ children: commentListSchema });
  const normalizedComments = normalize(nestedComments, commentListSchema);
  Object.entries(normalizedComments.entities.comments).forEach(
    ([id, comment]) => {
      const { vote_state, ...newComment } = comment;
      normalizedComments.entities.comments[id] = {
        ...newComment,
        voteDisplayState: vote_state
      };
    }
  );
  return dispatch({
    type: FETCH_POST_COMMENT_TREES_SUCCESS,
    data: normalizedComments
  });
};

// Use redux-thunk to grab the userAuth token
export const makeCreateCommentRequest = commentData => (dispatch, getState) =>
  dispatch({
    type: API_CREATE_COMMENT,
    types: {
      request: CREATE_COMMENT_REQUEST,
      success: CREATE_COMMENT_SUCCESS,
      failure: CREATE_COMMENT_FAILURE
    },
    callAPI: () => createCommentApi(commentData, getState().authReducer.access)
  });

// Use redux-thunk to grab the userAuth token
export const makeDeleteCommentRequest = pk => (dispatch, getState) =>
  dispatch({
    type: API_DELETE_COMMENT,
    types: {
      request: DELETE_COMMENT_REQUEST,
      success: DELETE_COMMENT_SUCCESS,
      failure: DELETE_COMMENT_FAILURE
    },
    callAPI: () => deleteCommentApi(pk, getState().authReducer.access)
  });

// Use redux-thunk to grab the userAuth token
export const makeUpdateCommentRequest = commentData => (dispatch, getState) =>
  dispatch({
    type: API_UPDATE_COMMENT,
    types: {
      request: UPDATE_COMMENT_REQUEST,
      success: UPDATE_COMMENT_SUCCESS,
      failure: UPDATE_COMMENT_FAILURE
    },
    callAPI: () => updateCommentApi(commentData, getState().authReducer.access)
  });
