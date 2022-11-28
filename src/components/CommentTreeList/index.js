import React from "react";
import PropTypes from "prop-types";

import {PanelListLoader} from "../Loaders";
import {ErrorAlert} from "../AlertMessage";
import CommentContainer from "../../containers/CommentContainer";
import CommentEditorContainer from "../../containers/CommentEditorContainer";
import {withEither, withMaybe} from "../../utilities/HOC";

const CommentTreeList = props => {
  const {
    rootCommentPks,
    error,
    loading,
    postPk,
    createCommentError,
    createCommentLoading
  } = props;

  if (error) {
    return <ErrorAlert>{error}</ErrorAlert>;
  }

  let commentRootList = [];
  if (Array.isArray(rootCommentPks) && rootCommentPks.length) {
    commentRootList = rootCommentPks.map(rootPk => (
      <CommentContainer pk={rootPk} key={rootPk} />
    ));
  }

  // Error with root comment creation
  const AlertOnError = withMaybe(props => props.children)(ErrorAlert);

  const CommentListWithLoading = withEither(
    props => props.loading,
    PanelListLoader
  )(() => commentRootList);

  return (
    <div className="comment-tree-list-container">
      <AlertOnError children={createCommentError} />
      <div className="top-comment-editor">
        <CommentEditorContainer
          parentPk={postPk}
          rootComment={true}
          usage="create"
          dontFocusOnEditor
          loading={createCommentLoading}
        />
      </div>

      <ul>
        <CommentListWithLoading loading={loading} panelNumber={10} />
      </ul>
    </div>
  );
};

CommentTreeList.propTypes = {
  rootCommentPks: PropTypes.arrayOf(PropTypes.number),
  error: PropTypes.string,
  loading: PropTypes.bool,
  createCommentError: PropTypes.string,
  createCommentLoading: PropTypes.bool
};

export default CommentTreeList;
