import {
    DELETE_POST_FAILURE,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    FETCH_POST_LIST_FAILURE,
    FETCH_POST_LIST_NEXT_FAILURE,
    FETCH_POST_LIST_NEXT_REQUEST,
    FETCH_POST_LIST_NEXT_SUCCESS,
    FETCH_POST_LIST_REQUEST,
    FETCH_POST_LIST_SUCCESS,
    FETCH_USER_PROFILE_SUCCESS,
    POST_VOTE_SUCCESS,
    SEARCH_SUCCESS
} from "../actions/actionTypes";
import {allIds, postsById, updateObjectOnVote} from "../utilities/reducerUtils";

// TODO: figure out why this descruture isnt working right on postsById.
// For some reason rest still contains the postId element
const deletePost = (state, postId) => {
  const { [postId]: deletedOne, ...rest } = state.postsById;
  delete rest[postId];

  const newAllPosts = [...state.allPosts];
  const deletionIndex = newAllPosts.indexOf(postId);
  newAllPosts.splice(deletionIndex, 1);

  return {
    ...state,
    postsById: { ...rest },
    allPosts: [...newAllPosts],
    deletionPostId: null
  };
};

// When we successfully request a new page, dont replace the posts
// that are already here. Instead append to allPosts (addNextIds)
// and add the new post information into postsById (addNextPosts)
const addNextPosts = (state, newPostList) => {
  return { ...state.postsById, ...postsById(newPostList) };
};
const addNextIds = (state, newPostList) => {
  // concat performs a shallow copy
  return state.allPosts.concat(allIds(newPostList));
};

const initialState = {
  postsById: {},
  allPosts: [],
  loading: true,
  error: null,
  nextPageError: null,
  deletionPostId: null,
  deleteError: null,
  nextPageUrl: null
};

const postList = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_POST_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        postsById: postsById(action.data.results),
        allPosts: allIds(action.data.results),
        nextPageUrl: action.data.next
      };
    case FETCH_POST_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case FETCH_POST_LIST_NEXT_REQUEST:
      return {
        ...state,
        nextPageError: null
      };
    case FETCH_POST_LIST_NEXT_SUCCESS:
      return {
        ...state,
        nextPageError: null,
        postsById: addNextPosts(state, action.data.results),
        allPosts: addNextIds(state, action.data.results),
        nextPageUrl: action.data.next
      };
    case FETCH_POST_LIST_NEXT_FAILURE:
      return {
        ...state,
        nextPageError: action.error
      };
    case POST_VOTE_SUCCESS:
      const postId = action.data.post;

      console.log(`XXXVT postId: ${JSON.stringify(postId)}`)

      return {
        ...state,
        postsById: {
          ...state.postsById,
          [postId]: updateObjectOnVote(
            state.postsById[postId],
            action.data.vote_type
          )
        }
      };
    case DELETE_POST_REQUEST:
      return {
        ...state,
        deleteError: null,
        deletionPostId: Number(action.pk)
      };
    case DELETE_POST_SUCCESS:
      return deletePost(state, state.deletionPostId);
    case DELETE_POST_FAILURE:
      return {
        ...state,
        deleteError: action.error
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        postsById: postsById(action.data.posts),
        allPosts: allIds(action.data.posts)
      };
    case FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        postsById: postsById(action.data.posts),
        allPosts: allIds(action.data.posts)
      };
    default:
      return state;
  }
};

// selectors
export const getPostById = (state, pk) => state.postList.postsById[pk];
export const getPostBodyById = (state, pk) =>
  getPostById(state, pk) ? getPostById(state, pk).body : null;
export const getAllPosts = state => state.postList.allPosts;
export const getPostListLoading = state => state.postList.loading;
export const getPostListError = state => state.postList.error;
export const getPostListNextPageUrl = state => state.postList.nextPageUrl;

export default postList;
