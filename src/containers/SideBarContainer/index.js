import React from "react";
import {connect} from "react-redux";

import SideBar from "../../components/SideBar";
import {getSubredditData} from "../../reducers/subreddit";
import {getAuthUsername} from "../../redux/auth/reducer";

const SideBarContainer = props => {
  const {
    subredditData: { title: subredditTitle, description, loading, pseudo },
    authenticatedUsername
  } = props;

  return (
    <SideBar
      {...{
        subredditTitle,
        description,
        loading,
        authenticatedUsername,
        pseudo
      }}
    />
  );
};

const mapStateToProps = state => ({
  subredditData: getSubredditData(state),
  authenticatedUsername: getAuthUsername(state)
});



export default connect(
  mapStateToProps,
  null
)(SideBarContainer);
