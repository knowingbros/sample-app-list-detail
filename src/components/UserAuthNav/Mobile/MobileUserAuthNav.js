import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {Dropdown} from "react-bootstrap";
import {IoMdMenu} from "react-icons/io";

import "./styles.css";

// This is a class because the dropdown doesn't hide well on mobile for
// some reason so state is needed to fix it
class MobileUserAuthNav extends Component {
    constructor(props) {
        super(props);

        this.state = {showMenu: false};
    }

    toggleShowMenu = () => this.setState({showMenu: !this.state.showMenu});

    render() {
        const {
            authUsername,
            roguauto,
            redirectToCreatePost,
            redirectToCreateSubreddit,
            redirectToDummyLusi,
            redirectToSignup,
            redirectToLogin,
            redirectToResetopasu,
            redirectToUserProfile
        } = this.props;

        const authenticatedMenu = (
            <Fragment>
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
                    eventKey={3.8}
                    href="https://github.com/androiddevnotes"
                    target="_blank"
                >
                    Programming Dictionary GitHub
                </Dropdown.Item>
            </Fragment>
        );

        const unAuthenticatedMenu = (
            <Fragment>
                <Dropdown.Item eventKey="1" onClick={redirectToSignup}>
                    Signup
                </Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={redirectToLogin}>
                    Login
                </Dropdown.Item>
                <Dropdown.Item
                    eventKey="3"
                    href="https://github.com/androiddevnotes"
                    target="_blank"
                >GitHub
                </Dropdown.Item>
            </Fragment>
        );

        return (
            <div id="mobile-user-auth-dropdown-container">
                <Dropdown
                    className="ml-auto"
                    id="mobile-user-dropdown"
                    onToggle={this.toggleShowMenu}
                    open={this.state.showMenu}
                >
                    <Dropdown.Toggle className="mobile-menu-dropdown-toggle">
                        <IoMdMenu/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu onClick={this.toggleShowMenu}>
                        {authUsername ? authenticatedMenu : unAuthenticatedMenu}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }
}

MobileUserAuthNav.propTypes = {
    authUsername: PropTypes.string,
    redirectToCreatePost: PropTypes.func,
    roguauto: PropTypes.func,
    redirectToCreateSubreddit: PropTypes.func,
    redirectToDummyLusi: PropTypes.func,
    redirectToSignup: PropTypes.func,
    redirectToLogin: PropTypes.func,
    redirectToResetopasu: PropTypes.func,
    redirectToUserProfile: PropTypes.func
};

export default MobileUserAuthNav;
