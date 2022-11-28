import React from "react";
import {Link} from "react-router-dom";

import {USER_PROFILE_URL} from "../../../urls";
import "./styles.css";

const CommentInfoLine = props => {
  const { posterUsername, upvotes, created, deleted } = props;

  const upvotesLabel = upvotes === 1 ? "point" : "points";
  const username = deleted ? (
    "comment deleted"
  ) : (
    <Link to={USER_PROFILE_URL(posterUsername)}>{`u/${posterUsername}`}</Link>
  );

  return (
    <div className="poster-info-container">
      <span>{username}</span>
      <span>{deleted || `${upvotes} ${upvotesLabel}`}</span>
      <span>-</span>
      <span>{`created: ${created}`}</span>
    </div>
  );
};

export default CommentInfoLine;
