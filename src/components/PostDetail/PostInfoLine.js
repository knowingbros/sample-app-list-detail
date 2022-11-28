import React from "react";

import {Link} from "react-router-dom";
import {USER_PROFILE_URL} from "../../urls";
import "./styles.css";

const PostInfoLine = ({ title, poster }) => (
  <div className="post-info-line">
    <div className="link-to-sub">
      <Link to={`/r/${title}`}>{`r/${title}`}</Link>
    </div>
    <span id="divider">-</span>
    <div className="link-to-user">
      <Link
        to={USER_PROFILE_URL(poster)}
      >{`posted by u/${poster} `}</Link>
    </div>
  </div>
);

export default PostInfoLine;
