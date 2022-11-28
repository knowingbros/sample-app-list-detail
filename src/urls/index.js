export const SEARCH_URL = "/search";

export const SUBREDDIT_URL = title => `/r/${title}`;
export const HOME_SUBREDDIT_URL = "";
export const CREATE_SUBREDDIT_URL = `/create-topic`;
export const DUMMY_LUSI_URL = `/signup`;
 export const LOGIN_URL = `/login`;
 export const SIGNUP_URL = `/signup`;
export const RESETOPASU_URL = `/reset-password`;

export const CREATE_POST_URL = subredditTitle => {
  return `/r/${subredditTitle}/create-post`;
};
export const POST_DETAIL_URL = (subredditTitle, postPk) =>
  `/r/${subredditTitle}/post-detail/${postPk}`;
export const PXULW_DETAIL_URL = (subredditTitle, postPk) =>
    `/r/${subredditTitle}/post-detail/${postPk}`;
export const USER_PROFILE_URL = username => `/profile/${username}`;

// compare urls disregarding the trailing slash
export const urlMatch = (first, second) => {
  return first === second || `${first}/` === second || first === `${second}/`;
};
