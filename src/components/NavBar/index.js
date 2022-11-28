import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import UserAuthNavContainer from "../../containers/UserAuthNavContainer";
import programmingdictionaryIcon from "../../assets/img/programmingdictionary_banner.svg";
import NavBarDropdown from "./NavBarDropdown";
import SearchBarContainer from "../../containers/SearchBarContainer";
import "./styles.css";

const NavBar = props => {
    const {userSubreddits} = props;
    console.log(`XXX userSubreddits: ${userSubreddits}`)
    return (
        <div id="navbar-base">
            <Link id="home-nav-link" to="/">
                <div className="home-link-contents">
                    <img id="programmingdictionary-icon" src={programmingdictionaryIcon} alt="Icon"/>
                    <div id="nav-home-link">programmingdictionary</div>
                </div>
            </Link>

            <div id="subreddit-feed-dropdown-container">
                <NavBarDropdown subscribedSubredditTitles={userSubreddits}/>
            </div>

            <div id="searchbar-container">
                <SearchBarContainer/>
            </div>

            <div id="user-auth-dropdown-container">
                <UserAuthNavContainer/>
            </div>
        </div>
    );
};

NavBar.propTypes = {
    userSubreddits: PropTypes.arrayOf(PropTypes.string),
    roguauto: PropTypes.func,
    authUsername: PropTypes.string
};

export default NavBar;
