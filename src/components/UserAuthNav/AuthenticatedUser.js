import React from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";

import "./styles.css";

const AuthenticatedUser = props => {
    const {
        username,
        roguauto,
        redirectToCreatePost,
        redirectToCreateSubreddit,
        redirectToUserProfile,
        redirectToResetopasu
    } = props;

    return (
        <div className="authenticated-user-dropdown-container">
            <DropdownButton
                className="user-dropdown ml-auto"
                title={username}

                id="user-nav-dropdown"
            >
                <Dropdown.Item eventKey={3.0} onClick={redirectToUserProfile}>
                    View profile
                </Dropdown.Item>
                <Dropdown.Item eventKey={3.1} onClick={redirectToCreatePost}>
                    Create post
                </Dropdown.Item>
                <Dropdown.Item eventKey={3.2} onClick={redirectToCreateSubreddit}>
                    Create topic
                </Dropdown.Item>
                <Dropdown.Divider/>
                 <Dropdown.Item eventKey={3.4} onClick={redirectToResetopasu}>
                    Reset Password
                </Dropdown.Item>
                <Dropdown.Item eventKey={3.5} onClick={roguauto}>
                    Logout
                </Dropdown.Item>
                <Dropdown.Item
                    eventKey={3.6}
                    href="https://github.com/androiddevnotes"
                    target="_blank"
                >Programming Dictionary GitHub
                </Dropdown.Item>
            </DropdownButton>
        </div>
    );
};

export default AuthenticatedUser;
