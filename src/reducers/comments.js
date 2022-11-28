import {
    COMMENT_VOTE_SUCCESS,
    CREATE_COMMENT_FAILURE,
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    DELETE_COMMENT_SUCCESS,
    FETCH_POST_COMMENT_TREES_FAILURE,
    FETCH_POST_COMMENT_TREES_REQUEST,
    FETCH_POST_COMMENT_TREES_SUCCESS,
    UPDATE_COMMENT_SUCCESS
} from "../actions/actionTypes";
import {updateObject, updateObjectOnVote} from "../utilities/reducerUtils";

// Returns an object with rootCommentIds property to
// That includes the newcomment id at the top
const addRootCommentId = (state, newComment) => {
    let newRoots = state.rootCommentIds.slice();
    newRoots.splice(0, 0, newComment.pk);
    return {rootCommentIds: newRoots};
};

// Returns a new commentsById object with the parent object
// updated to include the new child
const addChildCommentId = (state, newComment) => {
    const parentId = newComment.parent;
    const oldParent = state.commentsById[parentId];
    // This is a hack fix because the comment creation backend doesn't
    // add a children array like it should. So if you comment on a nascent
    // comment you will get an error because there is no children array
    oldParent.children = oldParent.children || [];
    const newChildren = oldParent.children.slice();
    newChildren.splice(0, 0, newComment.pk);
    const newParent = {
        ...oldParent,
        children: newChildren
    };
    return {...state.commentsById, [parentId]: newParent};
};

// Handles adding the newComment id to either the rootCommentIds or
// the children array of the parent (depending on which is appropriate)
// Also adds the new comment to the commentsById object.
const addComment = (state, newComment) => {
    // First to some fixes particular to a nacsent comment
    const {vote_state, ...rest} = newComment;
    const updatedComment = {
        ...rest,
        voteDisplayState: vote_state,
        created: "just now"
    };

    // if it's a root comment
    if (!newComment.parent) {
        return {
            ...addRootCommentId(state, updatedComment),
            commentsById: {...state.commentsById, [newComment.pk]: updatedComment}
        };
    } else {
        // or it it is a child comment
        const newCommentsById = addChildCommentId(state, updatedComment);
        return {
            commentsById: {
                ...newCommentsById,
                [newComment.pk]: updatedComment
            }
        };
    }
};

// Update a particular comment with id and new object properties newProps
const updateComment = (state, id, newProps) => {
    const oldComment = state.commentsById[id];
    return {
        ...state,
        commentsById: {
            ...state.commentsById,
            [id]: updateObject(oldComment, newProps)
        }
    };
};

const initialState = {
    commentsById: {},
    postersById: {},
    rootCommentIds: [],
    error: null,
    loading: false,
    createCommentError: null,
    createCommentLoading: false
};

const comments = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POST_COMMENT_TREES_REQUEST:
            return {
                ...state,
                loading: true,
                createCommentLoading: false,
            };
        case FETCH_POST_COMMENT_TREES_SUCCESS:
            return {
                ...state,
                commentsById: action.data.entities.comments,
                postersById: action.data.entities.posters,
                rootCommentIds: action.data.result,
                error: null,
                loading: false,
                createCommentLoading: false,

                createCommentError: null
            };
        case FETCH_POST_COMMENT_TREES_FAILURE:
            return {
                ...state,
                error: action.error,
                createCommentLoading: false,

            };
        case CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                ...addComment(state, action.data),
                createCommentLoading: false,
                createCommentError: null
            };
        case CREATE_COMMENT_REQUEST:
            return {
                ...state,
                createCommentLoading: true,
                createCommentError: null
            };
        case CREATE_COMMENT_FAILURE:
            return {
                ...state,
                createCommentLoading: false,
                createCommentError: action.error
            };
        case COMMENT_VOTE_SUCCESS:
            const commentId = action.data.comment;
            return {
                ...state,
                commentsById: {
                    ...state.commentsById,
                    [commentId]: updateObjectOnVote(
                        state.commentsById[commentId],
                        action.data.vote_type
                    )
                }
            };
        case DELETE_COMMENT_SUCCESS:
            return updateComment(state, action.data.pk, {
                deleted: true
            });
        case UPDATE_COMMENT_SUCCESS:
            return updateComment(state, action.data.pk, {
                ...action.data
            });
        default:
            return state;
    }
};

// // Selectors
// Ordered array of root comments, based on api ordering
export const getRootCommentPks = state => state.comments.rootCommentIds;
export const getCommentById = (state, pk) => state.comments.commentsById[pk];
export const getPosterByCommentId = (state, pk) => {


    const posterId = state.comments.commentsById[pk].poster;

    if (posterId === null) {
        console.log(`xxx posterId: ${posterId}`)
        console.log(`xxx posterId state.comments.commentsById[pk]: ${state.comments.commentsById[pk]}`)
        return -1
    } else {
        return state.comments.postersById[posterId];
    }
};
export const getVoteDisplayStateById = (state, pk) =>
    state.comments.commentsById[pk].voteDisplayState;
export const getCommentsLoading = state => state.comments.loading;
export const getCommentsError = state => state.comments.error;
export const getCreateCommentError = state => state.comments.createCommentError;
export const getCreateCommentLoading = state =>
    state.comments.createCommentLoading;

export default comments;
