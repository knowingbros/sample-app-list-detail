import React from "react";

import SideBarContainer from "../../containers/SideBarContainer";
import SortByNavBarContainer from "../../containers/SortByNavBarContainer";
import {SideBarLoader} from "../../components/Loaders";
import {withEither} from "../../utilities/HOC";
import {checkForPseudoSubreddits} from "../../reducers/subreddit";
import {SUBREDDIT_URL} from "../../urls";
import "./styles.css";
import {useNavigate, useParams} from "react-router-dom";
import SubscriptionButtonContainer from "../../containers/SubscriptionButtonContainer";
import {GenericBtn} from "../UserButton/UserButton.styles";
import SubscriptionButtonHeaderContainer from "../../containers/SubscriptionButtonHeaderContainer";
import alert from "../../redux/alert/actions";
import {useDispatch} from "react-redux";

const Subreddit = props => {

    let {subredditTitle = "home", postId} = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const {
        showSortByNavBar,
        primaryComponent,
        loading,
        pseudo,
        authenticatedUsername,
        ...restProps
    } = props;


    const redirectToSubreddit = () => {
            navigate(`/r/${subredditTitle}`);
    };

    const handleCreatePostClick = () => {
        if (authenticatedUsername) {
            navigate(`/r/${subredditTitle}/create-post`);
        } else {
            dispatch(alert("You must be logged in to create a post.", "danger"));
            navigate(`/login`);
        }
    };

    const SideBarContainerWithLoader = withEither(
        props => props.loading,
        SideBarLoader
    )(SideBarContainer);

    // Need to perform check with route title rather than
    // redux version to avoid incorrect initial render of header bar
    const headerBar = checkForPseudoSubreddits(subredditTitle) ? null : (
        <div className="subreddit-header-bar" >
            <div id="subreddit-header-bar-title" onClick={redirectToSubreddit}> r/{subredditTitle}</div>
            {!pseudo && (
                <div className="hide-subscription-in-header">
                    <SubscriptionButtonHeaderContainer subredditTitle={subredditTitle}/>
                    <GenericBtn
                        id="create-post-button"
                        className="sidebar-button"
                        onClick={handleCreatePostClick}
                    >
                        Create Post
                    </GenericBtn>
                </div>


            )}
        </div>
    );

    const sortByNavBar = showSortByNavBar ? <SortByNavBarContainer/> : null;

    return (
        <div className="subreddit-container">
            {headerBar}
            {sortByNavBar}
            <div className={"subreddit-content"}>
                <div className="primary-container">{primaryComponent(restProps)}</div>
                <div className="sidebar-container">
                    <SideBarContainerWithLoader loading={loading}/>
                </div>
            </div>
        </div>
    );
};

export default Subreddit;
