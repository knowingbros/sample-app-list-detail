import React, {useEffect} from "react";
import {connect} from "react-redux";

import {makeCommentTreeRequest} from "../../actions/Comments";
import CommentTreeList from "../../components/CommentTreeList";
import {
    getCommentsError,
    getCommentsLoading,
    getCreateCommentError,
    getCreateCommentLoading,
    getRootCommentPks
} from "../../reducers/comments";
import {getPostDetailPk} from "../../reducers/postDetail";
import {getAuthUsername} from "../../redux/auth/reducer";
import {useParams} from "react-router-dom";
import {useComponentDidMountOrUpdate} from "../UserProfileContainer/useComponentDidMountOrUpdate";

function CommentTreeListContainer(props) {
    let {postId} = useParams();

    useEffect(() => {
        console.log('component mounted!')
        props.fetchCommentList(postId);
    }, []) //notice the empty array here

    useComponentDidMountOrUpdate(
        (prevDeps) => {
            const prevDep1 = prevDeps[0]

            console.log(`useComponentDidMountOrUpdate prevDep1: ${prevDep1}`)

            console.log(`useComponentDidMountOrUpdate username: ${props.authUsername}`)

            if (props.authUsername !== prevDep1) {
                // dep1 changed
                props.fetchCommentList(postId);
            }

            return () => { /* unmount handler */
            }
        },
        [props.authUsername]
    )

    return <CommentTreeList {...props} />;
}

const mapStateToProps = state => ({
    loading: getCommentsLoading(state),
    rootCommentPks: getRootCommentPks(state),
    error: getCommentsError(state),
    createCommentError: getCreateCommentError(state),
    createCommentLoading: getCreateCommentLoading(state),
    postPk: getPostDetailPk(state),
    authUsername: getAuthUsername(state)
});

const mapDispatchToProps = dispatch => ({
    fetchCommentList: postId => dispatch(makeCommentTreeRequest(postId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentTreeListContainer);
