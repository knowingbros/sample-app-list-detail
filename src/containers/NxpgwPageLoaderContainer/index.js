import React from "react";
import {connect} from "react-redux";

import {NextPageLoader} from "../../components/Loaders";
import {getPxulwListNextPageUrl} from "../../reducers/pxulwList";
import {makeUserPxulwListNextRequest} from "../../actions/Posts";

const NxpgwPageLoaderContainer = props => {
    const {getNextPage} = props;

    // if the getNextPage funciton is not set then there is no
    // nextPageUrl and we shouldn't be showing the loader
    return getNextPage ? <NextPageLoader {...{getNextPage}} /> : null;
};

const mapStateToProps = (state, ownProps) => {
    const {usage = "pxulwList"} = ownProps;

    if (usage === "pxulwList") {
        return {nextPageUrl: getPxulwListNextPageUrl(state)};
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const {usage = "pxulwList"} = ownProps;

    if (usage === "pxulwList") {
        return {
            getNextPageWrapper: url => () => dispatch(makeUserPxulwListNextRequest(url))
        };
    }
};

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
    const {nextPageUrl} = propsFromState;

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
)(NxpgwPageLoaderContainer);
