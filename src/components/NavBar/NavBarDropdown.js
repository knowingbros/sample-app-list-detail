import React from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

import "./styles.css";

const NavBarDropdown = ({subscribedSubredditTitles}) => {
    const subscribedSubs = subscribedSubredditTitles.map((title, idx) => (
        <LinkContainer key={idx} exact="true" to={"/r/" + title}>
            <Dropdown.Item eventKey={idx}>{title}</Dropdown.Item>
        </LinkContainer>
    ));

    return (
        <DropdownButton

            variant="secondary"
            className="feed-dropdown"
            title="Feed"
            id="basic-nav-dropdown"
        >
            <LinkContainer exact="true" to="/">
                <Dropdown.Item className="dropdown-item-nav-bar-z" eventKey={3.1}>home</Dropdown.Item>
            </LinkContainer>
            <LinkContainer exact="true" to="/r/popular">
                <Dropdown.Item className="dropdown-item-nav-bar-z" eventKey={3.2}>popular</Dropdown.Item>
            </LinkContainer>
            <LinkContainer exact="true" to="/r/all">
                <Dropdown.Item className="dropdown-item-nav-bar-z" eventKey={3.3}>all</Dropdown.Item>
            </LinkContainer>
            {subscribedSubredditTitles.length > 0 && (
                <Dropdown.Divider/>
            )}
            {subscribedSubs}
        </DropdownButton>
    );
};

export default NavBarDropdown;
