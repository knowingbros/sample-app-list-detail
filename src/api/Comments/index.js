import axios from "axios";

import {COMMENT_DETAIL_URL, COMMENT_LIST_URL, POST_COMMENT_TREES_URL, VOTE_URL} from "../constants";
import {tokenContextObj} from "../apiUtils";

export const getCommentTreeApi = (postPk, token) => {
  return axios
    .get(POST_COMMENT_TREES_URL(postPk), tokenContextObj(token))
    .then(response => response.data);
};

export const createCommentApi = (commentData, token) => {
  const { body, parentPk, rootComment } = commentData;
  // See backend, a 'fullname' is constructed to specify the parent of the comment
  const parentFn = rootComment ? `t2_${parentPk}` : `t1_${parentPk}`;
  const data = { body, parent_fn: parentFn };
  return axios
    .post(COMMENT_LIST_URL, data, tokenContextObj(token))
    .then(response => response.data);
};

export const deleteCommentApi = (pk, token) => {
  return axios
    .delete(COMMENT_DETAIL_URL(pk), tokenContextObj(token))
    .then(response => response.data);
};

export const updateCommentApi = (commentData, token) => {
  return axios
    .patch(
      COMMENT_DETAIL_URL(commentData.pk),
      commentData,
      tokenContextObj(token)
    )
    .then(response => response.data);
};

export const commentVoteApi = (voteData, token) => {
  const { vote_type, comment_pk: comment } = voteData;

  const data = { vote_type, item_fn: `t1_${comment}` }; //comment};
  return axios
    .post(VOTE_URL, data, tokenContextObj(token))
    .then(response => response.data);
};
