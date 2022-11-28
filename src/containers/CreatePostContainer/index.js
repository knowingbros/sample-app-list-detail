import React from "react";
import {connect} from "react-redux";

import CreatePost from "../../components/CreatePost";
import {clearCreatePostError, makeCreatePostRequest} from "../../actions/Posts";
import {getCreatePostError, getCreatePostLoading} from "../../reducers/createPost";
import {getSubredditData} from "../../reducers/subreddit";
import {getAuthUsername, getAuthUserSubredditTitles} from "../../redux/auth/reducer";
import {useComponentDidMountOrUpdate} from "../UserProfileContainer/useComponentDidMountOrUpdate";

function CreatePostContainer(props) {

    useComponentDidMountOrUpdate(
        (prevDeps) => {

            return () => { /* unmount handler */
                props.clearError();
            }
        },
        []
    )

    const {
        subredditData: {title: subredditTitle, pseudo: pseudoSubreddit},
        ...rest
    } = props;

    return <CreatePost {...{subredditTitle, pseudoSubreddit, ...rest}} />;
}

const mapStateToProps = state => ({
    errorMessage: getCreatePostError(state),
    loading: getCreatePostLoading(state),
    authorizedUsername: getAuthUsername(state),
    authUserSubredditTitles: getAuthUserSubredditTitles(state),
    subredditData: getSubredditData(state)
});

const mapDispatchToProps = dispatch => ({
    handleCreatePost: (title, engtitletranslation, body, subredditTitle) =>
        dispatch(makeCreatePostRequest(title, engtitletranslation, body, subredditTitle)),

    clearError: () => dispatch(clearCreatePostError())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePostContainer);
