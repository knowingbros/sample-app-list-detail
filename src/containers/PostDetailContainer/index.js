import React, {useEffect} from "react";
import {connect} from "react-redux";

import PostDetail from "../../components/PostDetail";
import {makeDeletePostRequest, makePostDetailRequest, togglePostEditor} from "../../actions/Posts";
import {getPostDetailData} from "../../reducers/postDetail";
import {getEditPostError, getPostEditorShowState} from "../../reducers/editPost";
import {useParams} from "react-router-dom";
import {getAuthUsername} from "../../redux/auth/reducer";

function PostDetailContainer(props) {
    let {postId} = useParams();

    useEffect(() => {
        console.log('component mounted!')
        props.fetchPostDetail(postId);
    }, []) //notice the empty array here

    useEffect(() => {
        console.log('component mounted')

        // return a function to execute at unmount
        return () => {
            if (props.showPostEditor) {
                props.togglePostEditor();
            }
        }
    }, []) // notice the empty array


    const {
        postDetailData: {
            body,
            title,
            posterUsername,
            pk,
            loading,
            voteDisplayState,
            engtitletranslation,
            cover,
            upvotes
        },
        subredditTitle,
        authUsername,
        showPostEditor,
        editPostError,
        commentScroll,
        handleDeletePost,
        togglePostEditor
    } = props;

    return (
        <PostDetail
            {...{
                body,
                title,
                subredditTitle,
                posterUsername,
                voteDisplayState,
                engtitletranslation,
                cover,
                upvotes,
                authUsername,
                pk,
                loading,
                showPostEditor,
                editPostError,
                commentScroll,
                handleDeletePost,
                togglePostEditor
            }}
        />
    );
}

const mapStateToProps = (state, ownProps) => ({
    postDetailData: getPostDetailData(state),
    subredditTitle: ownProps.title,
    showPostEditor: getPostEditorShowState(state),
    editPostError: getEditPostError(state),
    authUsername: getAuthUsername(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchPostDetail: postId => dispatch(makePostDetailRequest(postId)),
    handleDeletePost: (postId) =>
        dispatch(makeDeletePostRequest(Number(postId))),
    togglePostEditor: () => dispatch(togglePostEditor())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailContainer)
;
