import React, {useEffect} from "react";
import {connect} from "react-redux";

import {makeSubPostListRequest} from "../../actions/Posts";
import PostList from "../../components/PostList";
import {getAllPosts, getPostListError, getPostListLoading} from "../../reducers/postList";
import {getAuthUsername} from "../../redux/auth/reducer";
import {getCurrentSortOption} from "../../reducers/sortBy";
import {useParams} from "react-router-dom";
import {useComponentDidMountOrUpdate} from "../UserProfileContainer/useComponentDidMountOrUpdate";

function PostListContainer(props) {
    let {subredditTitle = "home"} = useParams();

    useEffect(() => {
        console.log('component mounted!')
        props.fetchPostList(subredditTitle, props.currentSortOption);
    }, []) //notice the empty array here

    useComponentDidMountOrUpdate(
        (prevDeps) => {
            const prevDep1 = prevDeps[0]
            const prevDep2 = prevDeps[1]
            const prevDep3 = prevDeps[2]

            console.log(`useComponentDidMountOrUpdate prevDep1: ${prevDep1}`)

            if (subredditTitle !== prevDep1 || props.authUsername !== prevDep2 || props.currentSortOption !== prevDep3) {
                // dep1 changed
                props.fetchPostList(
                    subredditTitle,
                    props.currentSortOption
                );
            }

            return () => { /* unmount handler */
            }
        },
        [subredditTitle, props.authUsername, props.currentSortOption]
    )


    let emptyListMessage = undefined;

    if (subredditTitle.toLowerCase() === "home") {
        emptyListMessage = `
        There are no posts in your home feed. Please subscribe to some topics to see posts here.
      `;
    }


    return <PostList {...props} subredditTitle={subredditTitle} emptyListMessage={emptyListMessage}/>;
}

const mapStateToProps = state => ({
    loading: getPostListLoading(state),
    error: getPostListError(state),
    allPosts: getAllPosts(state),
    authUsername: getAuthUsername(state),
    currentSortOption: getCurrentSortOption(state)
});

const mapDispatchToProps = dispatch => ({
    fetchPostList: (subredditTitle, orderBy) =>
        dispatch(makeSubPostListRequest(subredditTitle, orderBy))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostListContainer)
;
