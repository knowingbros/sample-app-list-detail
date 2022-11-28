import React from 'react';
import {connect} from 'react-redux';

import Comment from '../../components/Comment';
import {getCommentById, getPosterByCommentId,} from '../../reducers/comments';
import {getAuthUsername} from '../../redux/auth/reducer';
import {makeDeleteCommentRequest} from '../../actions/Comments';

const CommentContainer = (props) => {
  
  const {
    commentData,
    posterData,
    authUsername,
    handleDeleteComment,
    pk
    } = props;
  const {
    children: childrenPk,
    body,
    upvotes,
    created,
    voteDisplayState,
    deleted,
  } = commentData;
  const posterUsername  = (posterData && posterData.username) || authUsername;
  return (
    <Comment
      {...{
        childrenPk,
        body,
        upvotes,
        created,
        pk,
        voteDisplayState,
        deleted,
        posterUsername,
        authUsername,
        handleDeleteComment,
        }}
    />
  )
}

const mapStateToProps = (state, ownProps) => (
  {
      commentData: getCommentById(state, ownProps.pk),
      posterData: getPosterByCommentId(state, ownProps.pk),
      authUsername: getAuthUsername(state),
  }
)

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    handleDeleteComment: () => dispatch(makeDeleteCommentRequest(ownProps.pk)),
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentContainer);
