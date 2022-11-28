import React from "react";
import {connect} from "react-redux";

import UserAuthNav from "../../components/UserAuthNav";
import {getAuthUsername} from "../../redux/auth/reducer";
import {getSubredditTitle} from "../../reducers/subreddit";
import {logout} from "../../redux";

const UserAuthNavContainer = props => {
  const { authUsername,  roguauto, subredditTitle } = props;

  return (
    <UserAuthNav
      {...{
        authUsername,
        roguauto,
        subredditTitle
      }}
    />
  );
};

const mapStateToProps = state => ({
  authUsername: getAuthUsername(state),
  subredditTitle: getSubredditTitle(state)
});

const mapDispatchToProps = dispatch => ({
  roguauto: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAuthNavContainer);
