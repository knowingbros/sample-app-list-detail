import React from "react";
import {connect} from "react-redux";

import {SubscriptionButton} from "../../components/Buttons";
import {getAuthUsername, getAuthUserSubredditTitles} from "../../redux/auth/reducer";
import {makeSubSubscriptionRequest} from "../../actions/Subreddit";
import SubscriptionButtonHeader from "../../components/Buttons/SubscriptionButtonHeader";

const SubscriptionButtonHeaderContainer = props => {
  const {
    authenticatedUsername,
    userSubscriptions,
    subredditTitle,
    makeSubscriptionRequest
  } = props;

  return (

    <SubscriptionButtonHeader
      {...{
        authenticatedUsername,
        userSubscriptions,
        subredditTitle,
        makeSubscriptionRequest
      }}
    />
  );
};

const mapStateToProps = state => ({
  authenticatedUsername: getAuthUsername(state),
  userSubscriptions: getAuthUserSubredditTitles(state)
});

const mapDispatchToProps = dispatch => ({
  makeSubscriptionRequest: (subredditTitle, subAction) =>
    dispatch(makeSubSubscriptionRequest(subredditTitle, subAction))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionButtonHeaderContainer);
