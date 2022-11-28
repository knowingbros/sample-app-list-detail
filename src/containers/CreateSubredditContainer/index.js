import React from 'react';
import {connect} from 'react-redux';

import CreateSubreddit from '../../components/CreateSubreddit';
import {makeCreateSubredditRequest} from '../../actions/Subreddit';
import {getCreateSubredditError, getCreateSubredditLoading,} from '../../reducers/createSubreddit';
import {getAuthUsername} from "../../redux/auth/reducer";


function CreateSubredditContainer(props) {

    const {
        errorMessage,
        loading,
        handleCreateSubreddit,
    } = props;

    return (
        <CreateSubreddit {...{
            errorMessage,
            loading,
            handleCreateSubreddit,
        }}/>
    )
}

const mapStateToProps = (state) => ({
    errorMessage: getCreateSubredditError(state),
    loading: getCreateSubredditLoading(state),
    authorizedUsername: getAuthUsername(state),

});

const mapDispatchToProps = (dispatch) => ({
    handleCreateSubreddit: (subredditData) =>
        dispatch(makeCreateSubredditRequest(subredditData)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateSubredditContainer);
