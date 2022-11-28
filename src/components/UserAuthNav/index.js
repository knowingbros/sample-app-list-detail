import React, {Fragment} from "react";

import {
    CREATE_POST_URL,
    CREATE_SUBREDDIT_URL,
    DUMMY_LUSI_URL,
    LOGIN_URL,
    RESETOPASU_URL,
    USER_PROFILE_URL,
} from "../../urls";
import UnauthenticatedUser from "./UnauthenticatedUser";
import AuthenticatedUser from "./AuthenticatedUser";
import MobileUserAuthNav from "./Mobile/MobileUserAuthNav";
import {useNavigate} from "react-router-dom";
import alert from "../../redux/alert/actions";
import {useDispatch} from "react-redux";

function UserAuthNav(props) {
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const redirectToCreatePost = () => {

        console.log(`props.subredditTitle: ${props.subredditTitle} `)

        if (props.subredditTitle === "all" || props.subredditTitle === "popular") {
            dispatch(alert(`You can't create a post in the ${props.subredditTitle} page.`, "danger"));
        } else if (props.subredditTitle === "home") {
            dispatch(alert(`You can't create a post in the ${props.subredditTitle} page.`, "danger"));
        } else {
            return navigate(CREATE_POST_URL(props.subredditTitle));
        }
    }

    const redirectToCreateSubreddit = () => {


        return navigate(CREATE_SUBREDDIT_URL);
    }

    const redirectToDummyLusi = () => {
        return navigate(DUMMY_LUSI_URL);
    }

    const redirectToSignup = () => {
        return navigate(`/signup`);
    }

    const redirectToLogin = () => {
        return navigate(LOGIN_URL);
    }

    const redirectToResetopasu = () => {
        return navigate(RESETOPASU_URL);
    }

    const redirectToUserProfile = () => {
        return navigate(USER_PROFILE_URL(props.authUsername));
    }

    const {authUsername, roguauto} = props;

    const largeScreenComponent = (
        <div id="full-user-auth-dropdown-container">
            {authUsername ? (
                <AuthenticatedUser
                    username={authUsername}
                    roguauto={roguauto}
                    redirectToCreatePost={redirectToCreatePost(props)}
                    redirectToCreateSubreddit={redirectToCreateSubreddit}
                    redirectToUserProfile={redirectToUserProfile}
                    redirectToResetopasu={redirectToResetopasu}
                />
            ) : (
                <UnauthenticatedUser redirectToDummyLusi={redirectToDummyLusi}
                                     redirectToSignup={redirectToSignup}
                                     redirectToLogin={redirectToLogin}/>
            )}
        </div>
    );

    return (
        <Fragment>
            <MobileUserAuthNav
                {...{
                    authUsername,
                    roguauto
                }}
                redirectToResetopasu={redirectToResetopasu}
                redirectToSignup={redirectToSignup}
                redirectToLogin={redirectToLogin}
                redirectToCreatePost={redirectToCreatePost}
                redirectToCreateSubreddit={redirectToCreateSubreddit}
                redirectToUserProfile={redirectToUserProfile}
            />
            {largeScreenComponent}
        </Fragment>
    );
}

export default UserAuthNav;
