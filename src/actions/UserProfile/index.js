import {normalize, schema} from "normalizr";

import {
    API_USER_PROFILE,
    FETCH_USER_PROFILE_FAILURE,
    FETCH_USER_PROFILE_REQUEST,
    FETCH_USER_PROFILE_SUCCESS,
    SET_USER_PROFILE_VIEW
} from "../actionTypes";

import {getUserProfileApi} from "../../api/UserProfile";
import {getAuthUserAccess} from "../../redux/auth/reducer";

export const makeUserProfileRequest = username => (dispatch, getState) =>
  dispatch({
    type: API_USER_PROFILE,
    types: {
      request: FETCH_USER_PROFILE_REQUEST,
      success: normalizeCommentPostsOnSuccess,
      failure: FETCH_USER_PROFILE_FAILURE
    },
    callAPI: () => getUserProfileApi(username, getAuthUserAccess(getState()))
  });

export const setUserProfileView = (viewName = "posts") => ({
  type: SET_USER_PROFILE_VIEW,
  viewName
});

// We need post information for each comment included. Is nested into the
// comment data by the backend. We don't want nested data the redux state
// so normalize the comments and their posts here.
const normalizeCommentPostsOnSuccess = (data, getState, dispatch) => {
  const post = new schema.Entity("posts", {}, { idAttribute: "pk" });
  const comment = new schema.Entity(
    "comments",
    { post: post },
    { idAttribute: "pk" }
  );
  const commentList = new schema.Array(comment);

  let normalizedCommentData;

  if (data.comments.length === 0) {
    data.comments = [
      {
        post: {
          pk: -999,
          created: "5 months, 2 weeks ago",
          updated: "33 minutes ago",
          title: "Purpose others second floor arm send.",
          engtitletranslation:
            "Right statement region loss get fall enough. Evidence together art. And side show result sport crime specific.\nIdea eight address list affect style. Box on foreign. Without for key radio record business something.\nChair billion manage between off more tree. Form bank evening structure.\nLay growth between action never as. Same picture why best.\nSea talk standard radio.",
          body:
            "Bank pass bill get home although prevent table. Bar speak account activity page how. Here red stand mother full clear. Stage program good myself professor performance experience.\nCondition bring beautiful degree no enough. Consider summer audience table ten and. Impact sport collection choice back.",
          upvotes: 2,
          subreddit: 4,
          tags: [],
          cover: "http://127.0.0.1:8000/media/defaultimage.png",
          poster: 1,
          subreddit_title: "BedSitBloodPoor",
          poster_username: "nicholas15",
          vote_state: 0,
          highlight: "http://127.0.0.1:8000/posts/snippets/5/highlight/",
          code: "rgb(244,219,4)",
          linenos: false,
          language: "python",
          style: "friendly"
        },
        poster: 12,
        parent: null,
        body: "ssad",
        upvotes: 0,
        pk: 68,
        vote_state: 0,
        deleted: false,
        created: "3 minutes ago"
      }
    ];
    normalizedCommentData = normalize(data.comments, commentList);
  } else {
    normalizedCommentData = normalize(data.comments, commentList);
  }
  return dispatch({
    type: FETCH_USER_PROFILE_SUCCESS,
    data: { ...data, normalizedCommentData }
  });
};
