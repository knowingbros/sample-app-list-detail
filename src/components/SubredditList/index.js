import React from "react";
import PropTypes from "prop-types";

import SubredditPanelContainer from "../../containers/SubredditPanelContainer";
import EmptyPostList from "../PostList/EmptyPostList";
import {ErrorAlert} from "../AlertMessage";
import {PanelListLoader} from "../Loaders";
import "./styles.css";

const SubredditList = props => {
  const { loading, error, allSubreddits, emptyListMessage } = props;

  if (error) {
    return <ErrorAlert>{error}</ErrorAlert>;
  }

  let subredditList;
  if (loading) {
    subredditList = <PanelListLoader panelNumber={12} />;
  } else if (allSubreddits.length === 0) {
    subredditList = <EmptyPostList message={emptyListMessage} />;
  } else {
    subredditList = allSubreddits.map(subredditPk => (
      <SubredditPanelContainer key={subredditPk} pk={subredditPk} />
    ));
  }

  return (
    <div className="subreddit-search-results-container">{subredditList}</div>
  );
};

SubredditList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  allSubreddits: PropTypes.arrayOf(PropTypes.number),
  emptyListMessage: PropTypes.string
};

export default SubredditList;
