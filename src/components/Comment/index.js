import React, {Component} from "react";
import PropTypes from "prop-types";

import "./styles.css";
import ExpandedComment from "./ExpandedComment";
import CollapsedComment from "./CollapsedComment";
import {withEither} from "../../utilities/HOC";
import CommentContainer from "../../containers/CommentContainer";

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };

    this.handleToggleCollapse = this.handleToggleCollapse.bind(this);
  }

  handleToggleCollapse() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const {
      childrenPk,
      body,
      upvotes,
      created,
      pk,
      voteDisplayState,
      deleted,
      posterUsername,
      authUsername,
      handleDeleteComment
    } = this.props;

    let childrenList = [];
    if (Array.isArray(childrenPk) && childrenPk.length) {
      childrenList = childrenPk.map(childPk => (
        <CommentContainer pk={childPk} key={childPk} />
      ));
    }

    const CollapsibleComment = withEither(
      props => props.collapsed,
      CollapsedComment
    )(ExpandedComment);

    return (
      <CollapsibleComment
        {...{
          childrenList,
          body,
          upvotes,
          created,
          pk,
          voteDisplayState,
          deleted,
          posterUsername,
          authUsername,
          handleDeleteComment
        }}
        handleToggleCollapse={this.handleToggleCollapse}
        collapsed={this.state.collapsed}
      />
    );
  }
}

Comment.propTypes = {
  childrenPk: PropTypes.arrayOf(PropTypes.number),
  body: PropTypes.string,
  upvotes: PropTypes.number,
  created: PropTypes.string,
  pk: PropTypes.number,
  voteDisplayState: PropTypes.number,
  deleted: PropTypes.bool,
  posterUsername: PropTypes.string,
  authUsername: PropTypes.string,
  handleDeleteComment: PropTypes.func
};

export default Comment;
