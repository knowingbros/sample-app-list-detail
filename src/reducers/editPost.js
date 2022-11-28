import {
    TOGGLE_POST_EDITOR,
    UPDATE_POST_FAILURE,
    UPDATE_POST_REQUEST,
    UPDATE_POST_SUCCESS,
} from '../actions/actionTypes';


const initialState = {
  showDetailPostEditor: false,
  loading: false,
  error: false,
}

const editPost = (state=initialState, action) => {
  switch(action.type) {
    case TOGGLE_POST_EDITOR:
      return {
        ...state,
        loading: false,
        showDetailPostEditor: !state.showDetailPostEditor,
      };
    case UPDATE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      }
    case UPDATE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state;
  }
};

//
export const getPostEditorShowState = (state) => state.editPost.showDetailPostEditor;
export const getEditPostError = (state) => state.editPost.error;
export const getEditPostLoading = (state) => state.editPost.loading;

export default editPost;
