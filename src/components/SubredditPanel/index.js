import React from "react";
import PropTypes from "prop-types";

import SubscriptionButtonContainer from "../../containers/SubscriptionButtonContainer";
import "./styles.css";

const SubredditPanel = ({ subreddit, handleSubredditRedirect }) => (
  <div className="subreddit-panel" onClick={handleSubredditRedirect}>
    <div className="title-and-subscriptions">
      <h1>r/{subreddit.title}</h1>
      <p>{subreddit.members.length} Subscribers </p>
    </div>

    <div className="description">
      <p>{subreddit.description}</p>
    </div>

    <div className="subscription-button">
      <SubscriptionButtonContainer subredditTitle={subreddit.title} />
    </div>
  </div>
);

SubredditPanel.propTypes = {
  subreddit: PropTypes.shape({
    title: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.number),
    description: PropTypes.string
  })
};

export default SubredditPanel;
