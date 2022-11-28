import React from "react";
import {connect} from "react-redux";

import {NextPageLoader} from "../../components/Loaders";
import {getPostListNextPageUrl} from "../../reducers/postList";
import {makeSubPostListNextRequest} from "../../actions/Posts";

const NextPageLoaderContainer = props => {
  const { getNextPage } = props;

  // if the getNextPage funciton is not set then there is no
  // nextPageUrl and we shouldn't be showing the loader
  return getNextPage ? <NextPageLoader {...{ getNextPage }} /> : null;
};

const mapStateToProps = (state, ownProps) => {
  const { usage = "postList" } = ownProps;

  if (usage === "postList") {
    return { nextPageUrl: getPostListNextPageUrl(state) };
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { usage = "postList" } = ownProps;

  if (usage === "postList") {
    return {
      getNextPageWrapper: url => () => dispatch(makeSubPostListNextRequest(url))
    };
  }
};

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
  const { nextPageUrl } = propsFromState;

  // Guard against hitting the end of the pages and requesting against a
  // null url
  return {
    getNextPage: nextPageUrl
      ? propsFromDispatch.getNextPageWrapper(nextPageUrl)
      : null
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(NextPageLoaderContainer);
