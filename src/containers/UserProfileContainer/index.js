import React, {useEffect} from "react";
import {connect} from "react-redux";

import UserProfile from "../../components/UserProfile";
import {makeUserProfileRequest, setUserProfileView} from "../../actions/UserProfile";
import {
    getUserProfileAllCommentPosts,
    getUserProfileData,
    getUserProfileError,
    getUserProfileLoading,
    getUserProfileView
} from "../../reducers/userProfile";
import {getAllPosts} from "../../reducers/postList";
import {useParams} from "react-router-dom";
import {useComponentDidMountOrUpdate} from "./useComponentDidMountOrUpdate";

function UserProfileContainer(props) {

    let {username} = useParams();
    // console.log(`username: ${username}`)
    const {
        allPosts,
        allCommentPosts,
        error,
        loading,
        profileView,
        changeProfileView,
        userData: {cakeDay, karma}
    } = props;

    console.log(`username: ${username}`)

    useEffect(() => {
        console.log('component mounted!')
        props.fetchUserProfile(username);
    }, []) //notice the empty array here

// https://stackoverflow.com/a/67284068/13621090
    useComponentDidMountOrUpdate(
        (prevDeps) => {
            const prevDep1 = prevDeps[0]

            console.log(`useComponentDidMountOrUpdate prevDep1: ${prevDep1}`)

            console.log(`useComponentDidMountOrUpdate username: ${username}`)

            if (username !== prevDep1) {
                // dep1 changed
            }

            return () => { /* unmount handler */
            }
        },
        [username]
    )

    return (
        <UserProfile
            {...{
                allPosts,
                allCommentPosts,
                username,
                error,
                loading,
                profileView,
                changeProfileView,
                cakeDay,
                karma
            }}
        />
    );
}

const mapStateToProps = state => ({
    allPosts: getAllPosts(state),
    allCommentPosts: getUserProfileAllCommentPosts(state),
    userData: getUserProfileData(state),
    profileView: getUserProfileView(state),
    loading: getUserProfileLoading(state),
    error: getUserProfileError(state)
});

const mapDispatchToProps = dispatch => ({
    fetchUserProfile: username => dispatch(makeUserProfileRequest(username)),
    changeProfileView: view => dispatch(setUserProfileView(view))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfileContainer);
