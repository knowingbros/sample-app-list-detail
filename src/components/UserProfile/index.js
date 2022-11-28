import React from "react";
import PropTypes from "prop-types";

import PostList from "../PostList";
import CommentList from "./CommentList";
import {withEither} from "../../utilities/HOC";

import "./styles.css";
import {GenericBtn, GenericDiv} from "../UserButton/UserButton.styles";
import {MdCake} from "react-icons/md";
import {TextWithoutMargin} from "../Account.styles";
import {useNavigate} from "react-router-dom";

function UserProfile(props) {
    let navigate = useNavigate();

    const {
        allPosts,
        allCommentPosts,
        username,
        cakeDay,
        karma,
        profileView,
        changeProfileView,
        error,
        loading
    } = props;

    const ConditionalList = withEither(
        props => props.view === "comments",
        CommentList
    )(PostList);

    const emptyListMessage = `u/${username} has not posted anything yet.`;

    const navSelectorButtonColor = "#1a1a1a";

    return (
        <div className="user-profile-container">

            <div className="user-profile-main-content">
                <GenericDiv>
                    <h2>User Profile</h2>
                    <br/>
                    <TextWithoutMargin>{`u/${username}`}</TextWithoutMargin>
                    <TextWithoutMargin>
                        <MdCake id="up-info-icon"/>&nbsp;{cakeDay}
                    </TextWithoutMargin>
                </GenericDiv>
                <GenericBtn
                    onClick={() => {
                        return navigate(`/posts/user-list/${username}`);
                    }}>
                    🖱️ View all the Posts of u/{username}
                </GenericBtn>
            </div>
        </div>
    );
}

UserProfile.propTypes = {
    allPosts: PropTypes.arrayOf(PropTypes.number),
    allCommentPosts: PropTypes.arrayOf(PropTypes.number),
    username: PropTypes.string,
    cakeDay: PropTypes.string,
    karma: PropTypes.number,
    profileView: PropTypes.string,
    changeProfileView: PropTypes.func,
    error: PropTypes.string,
    loading: PropTypes.bool
};

export default UserProfile;
